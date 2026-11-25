const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const destino = "sistemadegraubetim@gmail.com";

function fieldsOf(form) {
  return [...form.querySelectorAll("input, textarea")].filter((field) => field.name !== "_honey");
}

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

function setStatus(form, text, state) {
  const status = form.querySelector("#contato-status");
  if (!status) return;
  status.textContent = text;
  status.hidden = !text;
  if (state) status.dataset.state = state;
  else delete status.dataset.state;
}

function sendMessage(form, data) {
  const extras = {
    _subject: "Nova mensagem pelo site DEGRAU",
    _replyto: data.email,
    _template: "table",
    _captcha: "false"
  };

  Object.entries(extras).forEach(([name, value]) => {
    let input = form.querySelector(`input[name="${name}"]`);
    if (!input) {
      input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      form.appendChild(input);
    }
    input.value = value;
  });

  form.submit();
}

export function initContato(root = document) {
  const form = root.querySelector("#contato-form");
  if (!form) return;

  form.action = `https://formsubmit.co/${destino}`;

  const submit = form.querySelector("[type='submit']");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = fieldsOf(form);
    let valid = true;

    fields.forEach((field) => {
      const text = messageFor(field);
      showError(field, text);
      if (text) valid = false;
    });

    if (!valid) {
      setStatus(form, "", "");
      const firstInvalid = fields.find((field) => field.getAttribute("aria-invalid") === "true");
      firstInvalid?.focus();
      return;
    }

    if (form._honey?.value.trim()) {
      form.reset();
      setStatus(form, "Mensagem enviada. Entraremos em contato em breve.", "success");
      return;
    }

    if (submit) {
      submit.disabled = true;
      submit.textContent = "Enviando…";
    }
    sendMessage(form, readForm(form));
  });

  form.addEventListener("input", (event) => {
    const field = event.target;
    if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)) return;
    if (field.getAttribute("aria-invalid") === "true") showError(field, messageFor(field));
  });
}
