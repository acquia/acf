<?php

namespace Drupal\acf_catalog\Form;

use Drupal\Core\Entity\EntityConfirmFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;

/**
 * Builds the form to delete Catalog entities.
 */
class CatalogImportForm extends EntityConfirmFormBase {

  /**
   * {@inheritdoc}
   */
  public function getQuestion() {
    return $this->t('Are you sure you want to import child entities for "%name" catalog?', ['%name' => $this->entity->label()]);
  }

  public function getDescription() {
    return $this->t('This action will overwrite any existing entities and cannot be undone.');
  }

  /**
   * {@inheritdoc}
   */
  public function getCancelUrl() {
    return new Url('entity.catalog.collection');
  }

  /**
   * {@inheritdoc}
   */
  public function getConfirmText() {
    return $this->t('Yes, Run the Import');
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $catalog = $this->entity;
    $plugin_id = $catalog->getConnection();
    $connectionBridgeManager = \Drupal::service('plugin.manager.connection_bridge');
    $connectionManager = \Drupal::service('plugin.manager.connection');
    if ($plugin = $connectionBridgeManager->getDefinition($plugin_id)) {
      $type = $plugin['type'];
      $url = $plugin['base_url'] . $plugin['endpoint'];
      $connection = $connectionManager->createInstance($type);
      $params = $connection->getParams($url, $plugin_id);
      $body = $connection->request($params);
      $values = json_decode($body);
      if (is_array($values)) {
        $batch = [
          'title' => t('Creating data entities'),
          'operations' => [],
          'finished' => [self::class, 'saveDataFinished'],
        ];
        $count = 0;
        foreach ($values as $item) {
          $body = json_encode($item);
          $children = $catalog->getEntities();
          $keys = ['name' => 'title', 'field' => 'field_sku', 'value' => 'sku'];
          $params = ['sku', $keys, $body, $children, $catalog->id()];
          $batch['operations'][] = [[\Drupal\acf_catalog\CatalogManager::class, 'saveBasicData'], $params];
          $count++;
        }
        $label = $catalog->label();
        $message = $this->t('Catalog "@label" contains @count data items.',
          ['@label' => $label, '@count' => $count]);
        drupal_set_message($message);
        batch_set($batch);
      }
    }
    $form_state->setRedirectUrl($this->getCancelUrl());
  }

}
