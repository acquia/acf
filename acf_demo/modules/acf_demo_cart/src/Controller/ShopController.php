<?php

namespace Drupal\acf_demo_cart\Controller;

use Drupal\acf_demo_cart\Controller\BaseController;

/**
 * Class ShopController.
 *
 * @package Drupal\acf_demo_cart\Controller
 */
class ShopController extends BaseController {

  /**
   * Shopping cart page.
   *
   * @return mixed
   *   Overview page.
   */
  public function cart() {

    $build = [
      // Adding data to JS for future use
      '#attached' => [
        'drupalSettings' => [
          'acf_demo_cart' => [
            'products' => $this->loadData('products'),
            'categories' => $this->loadData('categories'),
          ],
        ],
      ],
    ];

    return $build;
  }

}
