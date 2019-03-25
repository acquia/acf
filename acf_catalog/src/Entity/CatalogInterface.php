<?php

namespace Drupal\acf_catalog\Entity;

use Drupal\Core\Config\Entity\ConfigEntityInterface;

/**
 * Provides an interface for defining Catalog entities.
 */
interface CatalogInterface extends ConfigEntityInterface {

  /**
   * Get the Connection Bridge for this catalog.
   *
   * @return string
   */
  public function getConnection();

  /**
   * @param $connection
   *
   * @return $this|mixed
   */
  public function setConnection($connection);

  /**
   * Load the Connection Bridge Plugin for this catalog.
   *
   * @return object
   */
  public function getConnectionBridge();

  /**
   * Get the Child entity list for this catalog.
   *
   * @return string
   */
  public function getEntities();

  /**
   * Easy access to the Connection Bridge Manager via the entity,
   *
   * @return object
   */
  public function connectionBridgeManager();

}
