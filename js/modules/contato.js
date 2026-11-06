const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function messageFor(field) {
  const value = field.value.trim();
  if (field.type === "email") {
    if (!value) return "Informe o e-mail.";
    if (!emailPattern.test(value)) return "Informe um e-mail válido.";
    return "";
  }
  if (!value) return "Preencha este campo.";
  return "";
}

function showError(field, text) {
  const error = document.getElementById(`${field.id}-erro`);
  field.setAttribute("aria-invalid", text ? "true" : "false");
  if (!error) return;
  error.textContent = text;
  error.hidden = !text;
}

function readForm(form) {
  return {
    nome: form.nome.value.trim(),
    email: form.email.value.trim(),
    mensagem: form.mensagem.value.trim()
  };
}

export function initContato(root = document) {
  const form = root.querySelector("#contato-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = [...form.querySelectorAll("input, textarea")];
    let valid = true;

    fields.forEach((field) => {
      const text = messageFor(field);
      showError(field, text);
      if (text) valid = false;
    });

    if (!valid) {
      const firstInvalid = fields.find((field) => field.getAttribute("aria-invalid") === "true");
      firstInvalid?.focus();
      return;
    }

    // Integração futura: enviar readForm(form) ao serviço definido pela equipe.
    readForm(form);
  });

  form.addEventListener("input", (event) => {
    const field = event.target;
    if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)) return;
    if (field.getAttribute("aria-invalid") === "true") showError(field, messageFor(field));
  });
}
