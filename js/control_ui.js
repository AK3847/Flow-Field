function Slider(
  label,
  min = 0,
  max = 100,
  val = 10,
  step = 10,
  parent = createDiv(),
  update = () => {}
) {
  let wrap = createDiv(label);
  wrap.parent(parent);
  wrap.class("slider");
  let slider = createSlider(min, max, val, step);
  slider.input(update);
  slider.class("form-control-range");
  slider.parent(wrap);
  return slider;
}

function Button(text, parent, callback, type = "not_modal") {
  let buttonwrap = createDiv();
  buttonwrap.class("button-wrapper");
  buttonwrap.parent(parent);
  let button = createButton(text);
  button.class("butn");
  button.parent(buttonwrap);
  button.mousePressed(callback);
}

function Colorpicker(
  label = "Pick a color",
  startcolor = "blue",
  parent = createDiv(),
  update = () => {}
) {
  let wrap = createDiv(label);
  wrap.class("color-picker");
  wrap.parent(parent);
  let picker = createColorPicker(startcolor);
  picker.input(() => update(picker.value()));
  picker.parent(wrap);
  return picker;
}
