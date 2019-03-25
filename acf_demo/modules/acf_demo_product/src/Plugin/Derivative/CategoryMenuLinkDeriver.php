<?php
 
namespace Drupal\acf_demo_product\Plugin\Derivative;
 
use Drupal\Component\Plugin\Derivative\DeriverBase;
use Drupal\Core\Plugin\Discovery\ContainerDeriverInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
 
/**
 * Derivative class that provides the menu link for each Category.
 */
class CategoryMenuLinkDeriver extends DeriverBase implements ContainerDeriverInterface {
 
   /**
   * @var EntityTypeManagerInterface $entityTypeManager.
   */
  protected $entityTypeManager;
 
  /**
   * Creates a CategoryMenuLinkDeriver instance.
   *
   * @param $base_plugin_id
   * @param EntityTypeManagerInterface $entity_type_manager
   */
  public function __construct($base_plugin_id, EntityTypeManagerInterface $entity_type_manager) {
    $this->entityTypeManager = $entity_type_manager;
  }
 
  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, $base_plugin_id) {
    return new static(
      $base_plugin_id,
      $container->get('entity_type.manager')
    );
  }
 
  /**
   * {@inheritdoc}
   */
  public function getDerivativeDefinitions($base_plugin_definition) {
    $links = [];
    $params = ['vid' => 'category'];
    $storage = $this->entityTypeManager->getStorage('taxonomy_term');
    $categories = $storage->loadByProperties($params);
    foreach ($categories as $id => $category) {
      $links[$id] = [
        'title' => $category->label(),
        'route_name' => $category->toUrl()->getRouteName(),
        'route_parameters' => ['taxonomy_term' => $category->id()]
      ] + $base_plugin_definition;
    }
    return $links;
  }
}
