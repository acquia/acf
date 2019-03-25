<?php

namespace Drupal\acf_catalog\Entity;

use Drupal\Core\Config\Entity\ConfigEntityBase;
use Drupal\Core\DependencyInjection\ContainerInjectionInterface;

/**
 * Defines the Catalog entity.
 *
 * @ConfigEntityType(
 *   id = "catalog",
 *   label = @Translation("Catalog"),
 *   handlers = {
 *     "view_builder" = "Drupal\Core\Entity\EntityViewBuilder",
 *     "list_builder" = "Drupal\acf_catalog\CatalogListBuilder",
 *     "form" = {
 *       "add" = "Drupal\acf_catalog\Form\CatalogForm",
 *       "edit" = "Drupal\acf_catalog\Form\CatalogForm",
 *       "delete" = "Drupal\acf_catalog\Form\CatalogDeleteForm",
 *       "import" = "Drupal\acf_catalog\Form\CatalogImportForm"
 *     },
 *     "route_provider" = {
 *       "html" = "Drupal\acf_catalog\CatalogHtmlRouteProvider",
 *     },
 *   },
 *   config_prefix = "catalog",
 *   admin_permission = "administer site configuration",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "label",
 *     "uuid" = "uuid"
 *   },
 *   links = {
 *     "canonical" = "/admin/structure/catalog/{catalog}",
 *     "add-form" = "/admin/structure/catalog/add",
 *     "edit-form" = "/admin/structure/catalog/{catalog}/edit",
 *     "delete-form" = "/admin/structure/catalog/{catalog}/delete",
 *     "collection" = "/admin/structure/catalog",
 *     "import-form" = "/admin/structure/catalog/{catalog}/import"
 *   }
 * )
 */
class Catalog extends ConfigEntityBase implements CatalogInterface {

  /**
   * The Catalog ID.
   *
   * @var string
   */
  protected $id;

  /**
   * The Catalog label.
   *
   * @var string
   */
  protected $label;

  /**
   * The Catalog Connection Bridge Plugin ID
   *
   * @var string
   */
  protected $connection;

  /**
   * The Catalog entities created by the Catalog's connection.
   *
   * @var array
   */
  protected $entities;

  /**
   * {@inheritdoc}
   */
  public function getConnection() {
    return $this->connection;
  }

  /**
   * {@inheritdoc}
   */
  public function setConnection($connection) {
    $this->connection = $connection;
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function connectionBridgeManager() {
    return \Drupal::service('plugin.manager.connection_bridge');
  }

  /**
   * {@inheritdoc}
   */
  public function getConnectionBridge() {
    return $this->connectionBridgeManager()->getDefinition($this->connection);
  }

  /**
   * {@inheritdoc}
   */
  public function getEntities() {
    return $this->entities;
  }

}
