<ol class="fancy-list" 
    <?= attr(['start' => $attrs->start()], ' ') ?>
    style="list-style-type: <?= $attrs->style() ?> ;"
>
    <li type="checkbox" class="mock-checkbox"><?= $content ?></li>
</ol>
