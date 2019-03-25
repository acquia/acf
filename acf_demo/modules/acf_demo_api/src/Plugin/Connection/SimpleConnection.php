<?php

namespace Drupal\acf_demo_api\Plugin\Connection;

use Drupal\connection\Plugin\ConnectionBase;

/**
 * Class SimpleConnection (uses simple_api module)
 *
 * @package Drupal\connection\Plugin\DrupalConnection
 *
 * @Connection(
 *   id = "simple_connection",
 *   label = @Translation("Simple Connection"),
 * )
 */
class SimpleConnection extends ConnectionBase {

  /**
   * @param $url
   * @param null $plugin_id
   *
   * @return array|mixed
   */
  public function getParams($url, $plugin_id = NULL) {
    return [
      'url' => $url,
      'filename' => $plugin_id
    ];
  }

  /**
   * @param $params
   *
   * @return bool|\Psr\Http\Message\ResponseInterface|\Psr\Http\Message\StreamInterface|string
   * @throws \GuzzleHttp\Exception\GuzzleException
   */
  public function request($params) {
    if (isset($params['url']) && isset($params['filename'])) {
      $url = $params['url'] . $params['filename'];
      return $this->response($url);
    }
    return FALSE;
  }

}
