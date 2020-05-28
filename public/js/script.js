const toggle = (event) => {
  const hidden = event.target.parentNode.parentNode.children[1];
  const id = hidden.getAttribute("id");
  if (id == null) {
    hidden.setAttribute("id", "hidden");
  }
  else {
    hidden.removeAttribute("id");
  }
}