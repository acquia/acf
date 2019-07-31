<?php

namespace Drupal\acf_catalog\Form;

use Drupal\Core\Entity\EntityForm;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class CatalogForm.
 */
class CatalogForm extends EntityForm {

  /**
   * {@inheritdoc}
   */
  public function form(array $form, FormStateInterface $form_state) {
    $form = parent::form($form, $form_state);
    $catalog = $this->entity;
    $form['label'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Label'),
      '#maxlength' => 255,
      '#default_value' => $catalog->label(),
      '#description' => $this->t("Label for the Catalog."),
      '#required' => TRUE,
    ];
    $form['id'] = [
      '#type' => 'machine_name',
      '#default_value' => $catalog->id(),
      '#machine_name' => [
        'exists' => '\Drupal\acf_catalog\Entity\Catalog::load',
      ],
      '#disabled' => !$catalog->isNew(),
    ];
    $connection_options = [];
    $definitions = \Drupal::service('plugin.manager.connection_bridge')->getDefinitions();
    foreach ($definitions as $connection => $values) {
      $label = $values['label'];
      $id = $values['id'];
      $connection_options[$id] = t("@label (@id)", ['@label' => $label, '@id' => $id]);
    }
    $form['connection'] = [
      '#type' => 'select',
      '#default_value' => $catalog->getConnection(),
      '#options' => $connection_options,
      '#required' => TRUE,
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function save(array $form, FormStateInterface $form_state) {
    $catalog = $this->entity;
    $status = $catalog->save();

    switch ($status) {
      case SAVED_NEW:
        \Drupal::messenger()->addMessage($this->t('Created the %label Catalog.', ['%label' => $catalog->label()]));
        break;

      default:
        \Drupal::messenger()->addMessage($this->t('Saved the %label Catalog.', ['%label' => $catalog->label()]));
    }
    $form_state->setRedirectUrl($catalog->toUrl('collection'));
  }

}
