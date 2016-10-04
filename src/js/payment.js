const axios = require('axios');

const $items  = Array.from(document.querySelectorAll('.a-item[data-item-toggle]'));
const $submit = document.querySelector('.a-payment-button');
const $total  = $submit && $submit.querySelector('.a-payment-button__price');

const $sizeResult = document.querySelector('.a-item__selected-size');
const $sizes      = Array.from(document.querySelectorAll('.a-item__sizes__size'));

const $genderResult = document.querySelector('.a-item__selected-gender');
const $genders      = Array.from(document.querySelectorAll('.a-item__genders__gender'));

const $email = document.getElementById('changeEmail');

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
        if (!$next) {
            return;
        }

        if ($next.classList.contains('a-item__genders')) {
            if ($item.classList.contains('a-item--selected')) {
                $sizes[0].parentElement.classList.add('a-item__sizes--active');
                $genders[0].parentElement.classList.add('a-item__genders--active');
                $sizeResult.textContent = document.querySelector('[data-default-size]').textContent;
                $genderResult.textContent = document.querySelector('[data-default-gender]').textContent;
            } else {
                $sizes[0].parentElement.classList.remove('a-item__sizes--active');
                $genders[0].parentElement.classList.remove('a-item__genders--active');
                $sizeResult.textContent = '';
                $genderResult.textContent = '';
                document.querySelector('.a-item__sizes__size--selected').classList.remove('a-item__sizes__size--selected');
                document.querySelector('.a-item__genders__gender--selected').classList.remove('a-item__genders__gender--selected');
                document.querySelector('[data-default-size]').classList.add('a-item__sizes__size--selected');
                document.querySelector('[data-default-gender]').classList.add('a-item__genders__gender--selected');
            }
        }
    });
});

if ($submit) {
    $submit.addEventListener('click', e => {
        e.preventDefault();

        const data = {};

        if (document.querySelector('[data-ethernet]').classList.contains('a-item--selected')) {
            data.ethernet = true;
        }

        if (document.querySelector('[data-menu]').classList.contains('a-item--selected')) {
            data.menu = true;
        }

        if (document.querySelector('[data-visit]').classList.contains('a-item--selected')) {
            data.visit = true;
        }

        const shirt = document.querySelector('[data-shirt]');

        if (shirt.classList.contains('a-item--selected')) {
            data.shirt = JSON.stringify({
                gender: document.querySelector('.a-item__genders > .a-item__genders__gender--selected').textContent,
                size  : document.querySelector('.a-item__sizes > .a-item__sizes__size--selected').textContent
            });
        }

        data.email = $email.value;

        const form  = document.createElement('form');
        form.method = 'post';
        form.action = `${location.origin}/etupay`;

        Object.keys(data).forEach(name => {
            const input = document.createElement('input');
            input.type  = 'hidden';
            input.name  = name;
            input.value = data[name];
            form.appendChild(input);
        });

        form.submit();
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

$genders.forEach($gender => {
    $gender.addEventListener('click', e => {
        const $previousGender = document.querySelector('.a-item__genders__gender--selected');

        $previousGender.classList.remove('a-item__genders__gender--selected');

        $genderResult.textContent = $gender.textContent;

        $gender.classList.add('a-item__genders__gender--selected');
    });
});


if ($email) {
    const endsWith = (str, end) => str.indexOf(end, str.length - end.length) !== -1;

    const isPartner = () => {
        return endsWith($email.value.toLowerCase(), '@utt.fr') ||
            endsWith($email.value.toLowerCase(), '@utc.fr') ||
            endsWith($email.value.toLowerCase(), '@utbm.fr');
    }

    let actualIsPartner = false;

    const checkMail = () => {
        const newIsPartner = isPartner();

        if (newIsPartner === actualIsPartner) {
            return;
        }

        actualIsPartner = newIsPartner;

        if (newIsPartner) {
            document.querySelector('.a-item__price').textContent = '10€';
            const r = parseFloat($total.textContent) - 5;

            $total.textContent = (isInt(r) ? r.toString() : r.toFixed(2)) + '€';
        } else {
            document.querySelector('.a-item__price').textContent = '15€';
            const r = parseFloat($total.textContent) + 5;

            $total.textContent = (isInt(r) ? r.toString() : r.toFixed(2)) + '€';
        }
    };

    $email.addEventListener('keyup', checkMail);

    checkMail();
}
