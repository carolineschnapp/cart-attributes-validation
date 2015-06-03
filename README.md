Use the HTML5 'required' attribute or use the class 'required' on your form field. It makes no difference which of the 2 you use. Go with what you prefer. Example:

```liquid
<input type="text" name="attributes[some-info]" value="{{ cart.attributes.some-info }}" placeholder="Some info..." required />

```
Then, add the content of validate-cart-attributes.liquid to your theme's layout/theme.liquid file. Paste the content before the closing </body> tag, that's near the bottom of theme.liquid.
