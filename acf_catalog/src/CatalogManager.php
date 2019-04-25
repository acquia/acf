<?php

namespace Drupal\acf_catalog;

use Drupal\Core\Entity\FieldableEntityInterface;

/**
 * Class CatalogManager.
 */
class CatalogManager implements CatalogManagerInterface {

  /**
   * A helper function for batch processes that require the service.
   *
   * @return mixed
   */
  public static function basicDataHandler() {
    return \Drupal::service('basic_data.handler');
  }

  /**
   * Another batch helper that must exist so we can use the service statically...
   *
   * @return mixed
   */
  public static function routeBuilder() {
    return \Drupal::service('router.builder');
  }

  /**
   * @param $type
   * @param $keys
   * @param $body
   * @param $children
   * @param $catalog_id
   *
   * @return bool|array
   */
  public static function saveBasicData($type, $keys, $body, $children, $catalog_id) {
    $values = json_decode($body);
    $key_name = $keys['name'];
    $key_field = $keys['field'];
    $key_value = $keys['value'];
    if ($storage = self::basicDataHandler()->getStorage()) {
      $existing_data = $storage->loadByProperties([
        'type' => $type,
        $key_field => $values->$key_value
      ]);
      if (is_array($existing_data) && !empty($existing_data)) {
        $existing_data = reset($existing_data);
      }
      if ($existing_data instanceof \Drupal\basic_data\Entity\BasicDataInterface) {
        $data = $existing_data;
      }
      else {
        $data = self::basicDataHandler()->createBasicData('sku', $body, $values);
      }
      // Ensure Name, data blob and key field are set.
      $data->setName($values->$key_name);
      $data->setData($body);
      $data->set($key_field, $values->$key_value);
      $data->set('field_catalog', $catalog_id);

      // Save the data into child entities.
      $entities = self::saveEntities($data, $children);

      // Rebuild the routes in case any changes require it.
      self::routeBuilder()->rebuild();

      return [
        'data' => self::basicDataHandler()->saveData($data),
        'children' => $entities
      ];
    }
    // Return false if we are unable to load storage.
    return FALSE;
  }

  /**
   * @param $data
   * @param $children
   *
   * @return array
   */
  public static function saveEntities($data, $children) {
    $batch = [
      'title' => t('Creating child entities'),
      'operations' => [],
      'finished' => [self::class, 'saveEntitiesFinished'],
    ];
    $items = [];
    foreach ($children as $entity_type => $entities) {
      foreach ($entities as $bundle => $property) {
        $params = [$entity_type, $bundle, $property, $data];
        $batch['operations'][] = [[self::class, 'saveEntity'], $params];
        $items[] = $data->getName();
      }
    }
    batch_set($batch);
    return $items;
  }

  /**
   * @param $entity_type
   * @param $bundle
   * @param $property
   * @param $data
   *
   * @return bool|\Drupal\Core\Entity\EntityInterface|\Drupal\Core\Entity\FieldableEntityInterface|mixed|object
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public static function saveEntity($entity_type, $bundle, $property, $data) {
    $values = json_decode($data->getData());
    $existing_entity = self::getReferencedEntity($entity_type, $property['key'], $data);
    if ($existing_entity instanceof FieldableEntityInterface) {
      $entity = $existing_entity;
    }
    if (!isset($entity)) {
      $item = ['type' => $bundle, 'title' => $values->title];
      $entity = \Drupal::entityTypeManager()->getStorage($entity_type)->create($item);
    }
    // Populate the fields based on the provided key info.
    foreach ($property['data'] as $field => $map) {
      $field_value = $map['value'];
      $field_type = $map['type'];
      switch ($field_type) {
        case 'image':
          $entity = self::addFieldImages($entity, $field, $values->$field_value);
          break;
        case 'rich_text':
          $entity->set($field, $values->$field_value);
          $entity->$field->format = $field_type;
          break;
        case 'entity_reference':
          $entity->set($field, ['target_id' => $values->$field_value]);
          break;
        case 'term':
          $entity = self::addFieldTerms($entity, $field, $values->$field_value, $field_value);
          break;
        default:
          $entity->set($field, $values->$field_value);
      }
    }
    // Associate the data "key" field with the basic data entity.
    $entity->set($property['key'], [
      'target_id' => $data->id(),
      'alt' => $data->getName(),
      'title' => $data->getName()
    ]);
    // Attempt to save the Entity.
    if ($entity->save()) {
      return $entity;
    }
    return FALSE;
  }

  /**
   * @param object $entity
   * @param string $field
   * @param array $images
   *
   * @return object
   */
  public static function addFieldImages($entity, $field, array $images) {
    $files = [];
    $public = 'public://';
    foreach ($images as $image_url) {
      // Process urls and create new files accordingly.
      if (filter_var($image_url, FILTER_VALIDATE_URL)) {
        $basename = strtok(basename($image_url), '?');
        $filename = $public . $basename;
        $image = file_get_contents($image_url);
        $file = file_save_data($image, $filename, FILE_EXISTS_REPLACE);
      }
      // Otherwise assume the file is already in place.
      else {
        $basename = $image_url;
        $uri = $public . $basename;
        $results = \Drupal::entityTypeManager()->getStorage('file')
          ->loadByProperties(['uri' => $uri]);
        $file = reset($results);
      }
      // Create file entity reference for the field.
        $files[] = [
          'target_id' => $file->id(),
          'alt' => $basename,
          'title' => $basename
        ];
    }
    $entity->set($field, $files);
    return $entity;
  }

  /**
   * @param $entity
   * @param $field
   * @param array $term_data
   * @param $bundle
   *
   * @return mixed
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public static function addFieldTerms($entity, $field, array $term_data, $bundle) {
   $terms = [];
   foreach ($term_data as $name) {
     $params = ['name' => $name, 'vid' => $bundle];
     $storage = \Drupal::entityTypeManager()->getStorage('taxonomy_term');
     $existing_term = $storage->loadByProperties($params);
     if (is_array($existing_term) && !empty($existing_term)) {
       $term = reset($existing_term);
     }
     if (!isset($term)) {
       $item = [
         'vid' => $bundle,
         'name' => ucwords(strtolower($name))
       ];
       $term = $storage->create($item);

       $term->save();
     }
     $terms[] = ['target_id' => $term->id()];
    }
    $entity->set($field, $terms);
    return $entity;
  }

  /**
   * Finds Entity of $type where $entity_reference_field references $data!
   *
   * @param $type
   * @param $entity_reference_field
   * @param $data
   *
   * @return bool|mixed
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public static function getReferencedEntity($type, $entity_reference_field, $data) {
    $params = [$entity_reference_field => $data->id()];
    $storage = \Drupal::entityTypeManager()->getStorage($type);
    $entity = $storage->loadByProperties($params);
    if (is_array($entity) && !empty($entity)) {
      return reset($entity);
    }
    return FALSE;
  }

  /**
   * @param $plugin_id
   *
   * @return bool|\Drupal\Core\Entity\EntityInterface[]
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public static function getCatalogs($plugin_id) {
    $storage = \Drupal::entityTypeManager()->getStorage('catalog');
    if ($catalogs = $storage->loadByProperties(['connection' => $plugin_id])) {
      return $catalogs;
    }
    return FALSE;
  }

  /**
   * @param $plugin_id
   *
   * @return bool|\Drupal\Core\Entity\EntityInterface|null
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public static function getCatalog($plugin_id) {
    $storage = \Drupal::entityTypeManager()->getStorage('catalog');
    if ($catalog = $storage->load($plugin_id)) {
      return $catalog;
    }
    return FALSE;
  }

}
