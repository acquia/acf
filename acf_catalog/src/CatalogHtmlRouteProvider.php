<?php

namespace Drupal\acf_catalog;

use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Entity\Routing\AdminHtmlRouteProvider;
use Symfony\Component\Routing\Route;

/**
 * Provides routes for Catalog entities.
 *
 * @see Drupal\Core\Entity\Routing\AdminHtmlRouteProvider
 * @see Drupal\Core\Entity\Routing\DefaultHtmlRouteProvider
 */
class CatalogHtmlRouteProvider extends AdminHtmlRouteProvider {

  /**
   * {@inheritdoc}
   */
  public function getRoutes(EntityTypeInterface $entity_type) {
    $collection = parent::getRoutes($entity_type);
    $route = (new Route('/admin/structure/catalog/{catalog}/import'))
      ->setDefaults([
        '_title' => 'Import',
        '_entity_form' => 'catalog.import',
      ])
      ->setOption('_admin_route', TRUE)
      ->setRequirement('_permission', 'administer site configuration');
    $collection->add('entity.catalog.import_form', $route);
    return $collection;
  }

}
