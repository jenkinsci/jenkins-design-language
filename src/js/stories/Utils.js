/**
 * Creates a style rule.
 * Usage:
 *      createCssRule(
 *          '.red-bold',
 *          'color: #f00; font-weight: bold'
 *      )
 * @param selector
 * @param rules
 */
function createCssRule(selector, rules) {
    const style = document.createElement('style');
    style.type = 'text/css';

    document.getElementsByTagName('head')[0].appendChild(style);

    style.sheet.insertRule(`${selector} {${rules}}`, 0);
}


export default {
    createCssRule,
};
