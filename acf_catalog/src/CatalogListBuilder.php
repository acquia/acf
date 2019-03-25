<?php

namespace Drupal\acf_catalog;

use Drupal\Core\Config\Entity\ConfigEntityListBuilder;
use Drupal\Core\Entity\EntityInterface;

/**
 * Provides a listing of Catalog entities.
 */
class CatalogListBuilder extends ConfigEntityListBuilder {

  /**
   * {@inheritdoc}
   */
  public function buildHeader() {
    $header['label'] = $this->t('Catalog');
    $header['id'] = $this->t('Machine name');
    $header['connection'] = $this->t('Connection');
    return $header + parent::buildHeader();
  }

  /**
   * {@inheritdoc}
   */
  public function buildRow(EntityInterface $entity) {
    $row['label'] = $entity->toLink();
    $row['id'] = $entity->id();
    $connectionBridge = $entity->getConnectionBridge();
    $row['connection'] = $connectionBridge['label'];
    return $row + parent::buildRow($entity);
  }

  /**
   * {@inheritdoc}
   */
  public function getDefaultOperations(EntityInterface $entity) {
    $operations = parent::getDefaultOperations($entity);
    $operations['import'] = [
        'title' => $this->t('Import'),
        'weight' => -100,
        'url' => $entity->toUrl('import-form')
      ];
    return $operations;
  }

}
