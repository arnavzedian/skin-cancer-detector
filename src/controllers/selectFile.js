function selectFile() {
    return new Promise((resolve) => {
      let fileInput = document.createElement("input");
      fileInput.setAttribute("type", "file");
      fileInput.addEventListener("change", resolve);
      fileInput.click();
    });
}

export default selectFile