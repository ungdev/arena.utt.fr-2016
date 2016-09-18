const $items  = Array.from(document.querySelectorAll('.a-item[data-item-toggle]'));
const $submit = document.querySelector('.a-payment-button');
const $total  = $submit.querySelector('.a-payment-button__price');

const $sizeResult = document.querySelector('.a-item__selected-size');
const $sizes      = Array.from(document.querySelectorAll('.a-item__sizes__size'));

const isInt = n => (n % 1) === 0;

$items.forEach($item => {
    $item.addEventListener('click', e => {
        $item.classList.toggle('a-item--selected');

        const actualValue = parseFloat($total.textContent);
        const value       = parseFloat($item.getAttribute('data-item-toggle'));

        let result;

        if ($item.classList.contains('a-item--selected')) {
            result = (actualValue + value);
        } else {
            result = (actualValue - value);
        }

        result = (isInt(result) ? result.toString() : result.toFixed(2));

        $total.textContent = result + '€';

        // Activate sizes for t-shirt
        const $next = $item.nextElementSibling;
        if ($next.classList.contains('a-item__sizes')) {
            if ($item.classList.contains('a-item--selected')) {
                $next.classList.add('a-item__sizes--active');
                $sizeResult.textContent = document.querySelector('[data-default-selected]').textContent;
            } else {
                $next.classList.remove('a-item__sizes--active');
                $sizeResult.textContent = '';
                document.querySelector('.a-item__sizes__size--selected').classList.remove('a-item__sizes__size--selected');
                document.querySelector('[data-default-selected]').classList.add('a-item__sizes__size--selected');
            }
        }
    });
});

if ($submit) {
    $submit.addEventListener('click', e => {

    });
}

$sizes.forEach($size => {
    $size.addEventListener('click', e => {
        const $previousSize = document.querySelector('.a-item__sizes__size--selected');

        $previousSize.classList.remove('a-item__sizes__size--selected');

        $sizeResult.textContent = $size.textContent;

        $size.classList.add('a-item__sizes__size--selected');
    });
});
