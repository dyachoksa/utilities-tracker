;(function () {
  function contentReady() {
    document.getElementById("language-select").addEventListener("change", function() {
      document.getElementById("language-form").submit();
    })
  }

  function ready() {
    const modal = new bootstrap.Modal(document.getElementById("modal"))

    window.htmx.on("htmx:afterSwap", (e) => {
      // Response targeting #dialog => shows the modal
      if (e.detail.target.id === "dialog") {
        modal.show(undefined)
      }
    })

    window.htmx.on("htmx:beforeSwap", (e) => {
      // Empty response targeting #dialog => hides the modal
      if (e.detail.target.id === "dialog" && !e.detail.xhr.response) {
        modal.hide()
        e.detail.shouldSwap = false
      }
    })

    // Remove dialog content after hiding
    window.htmx.on("hidden.bs.modal", () => {
      document.getElementById("dialog").innerHTML = ""
    })
  }

  window.addEventListener("load", contentReady);
  window.addEventListener("DOMContentLoaded", ready);
})();
