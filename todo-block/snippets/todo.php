<p class="todo">
    <input type="checkbox" class="mock-checkbox" <?= attr(['checked' => $attrs->done()->isTrue()], ' ') ?>> <?= $content ?>
</p>
