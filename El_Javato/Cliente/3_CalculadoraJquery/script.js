$(document).ready(function () {
    const pantalla = $('#pantalla');
    $('button').click(function () {
        if ($(this).text === '=') {
            const operation = pantalla.val();
            const operator = getOperator(operation);
            const operands = operation.split(operator);
            switch (operator){
                case '+':
                    pantalla.val(parseInt(operands[0] + operands[1]));
                    break;
                case '-':
                    pantalla.val(parseInt(operands[0] - operands[1]));
                    break;
                case '*':
                    pantalla.val(parseInt(operands[0] * operands[1]));
                    break;
                case '/':
                    pantalla.val(parseInt(operands[0] / operands[1]));
                    break;
            }
        } else if ($(this).text === 'Res') {
            pantalla.val('');
        } else if ($(this).text === '!') {
            const currentValue = pantalla.val();
            const url = 'http://api.mathjs.org/v4/?expr=' + encodeURIComponent(currentValue);
            $.get(url, function (r){
                console.log(r);
            });
        } else {
            const currentValue = pantalla.val();
            const newValue = currentValue + $(this).text();
            pantalla.val(newValue);
        }
    });
});

function  getOperator(operation){
    if(operation.includes('+')) {
        return '+';
    } else {
        if(operation.includes('-')) {
            return '-';
        } else {
            if(operation.includes('*')) {
                return '*';
            } else {
                if(operation.includes('/')) {
                    return '/';
                }
            }
        }
    }
}
