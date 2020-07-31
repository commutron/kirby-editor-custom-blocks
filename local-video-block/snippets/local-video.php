<figure>
    <video controls>
        <source src="<?= $attrs->src()->toUrl() ?>" type="<?= $attrs->mime() ?>">
    </video>
    <?php if ($attrs->caption()->isNotEmpty()): ?>
    <figcaption><?= $attrs->caption() ?></figcaption>
    <?php endif ?>
</figure>
