<?php

namespace Drupal\acf_demo_cart\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Class BaseController.
 *
 * @package Drupal\acf_demo_cart\Controller
 */
class BaseController extends ControllerBase {

  /**
   * Load dummy data.
   *
   * @param string $filename
   *   File name.
   *
   * @return mixed
   *   An array with data.
   */
  protected function loadData($filename) {
    $url = \Drupal::request()->getSchemeAndHttpHost() . "/api/simple/acf_demo/$filename";
    return json_decode(file_get_contents($url));
  }

}
