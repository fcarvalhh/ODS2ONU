document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById('formulario');
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');
    const emailInput = document.getElementById('email');

    // Função para formatar CPF
    function formatarCPF(cpf) {
        cpf = cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        if (cpf.length <= 3) return cpf;
        if (cpf.length <= 6) return cpf.replace(/(\d{3})(\d{1,})/, '$1.$2');
        if (cpf.length <= 9) return cpf.replace(/(\d{3})(\d{3})(\d{1,})/, '$1.$2.$3');
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,})/, '$1.$2.$3-$4');
    }

    // Função para formatar Telefone
    function formatarTelefone(telefone) {
        telefone = telefone.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        if (telefone.length <= 2) return `(${telefone}`;
        if (telefone.length <= 7) return `(${telefone.substring(0, 2)}) ${telefone.substring(2)}`;
        return `(${telefone.substring(0, 2)}) ${telefone.substring(2, 7)}-${telefone.substring(7, 11)}`;
    }

    // Validar CPF
    function validarCPF(cpf) {
        let cpfLimpo = cpf.replace(/\D/g, '');
        if (cpfLimpo.length !== 11) return false;
        let soma = 0;
        let resto;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpfLimpo.charAt(9))) return false;

        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpfLimpo.charAt(10))) return false;

        return true;
    }

    // Validar telefone
    function validarTelefone(telefone) {
        const regex = /\(\d{2}\) \d{5}-\d{4}/;
        return regex.test(telefone);
    }

    // Validar email
    function validarEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }

    // Limitar o tamanho de caracteres para o CPF e o telefone
    function limitarTamanho(input, maxLength, formatar) {
        input.addEventListener('input', function() {
            let valor = input.value;
            if (valor.length > maxLength) {
                valor = valor.slice(0, maxLength); // Limita o valor a maxLength
            }
            input.value = formatar(valor); // Aplica a formatação ao valor
        });
    }

    // Definir limite de caracteres para CPF e telefone (14 para CPF e 15 para telefone)
    limitarTamanho(cpfInput, 14, formatarCPF);  // CPF com 14 caracteres, incluindo pontos e traço
    limitarTamanho(telefoneInput, 15, formatarTelefone);  // Telefone com 15 caracteres, incluindo parênteses, espaço e traço

    // Ao submeter o formulário
    formulario.addEventListener('submit', function(event) {
        let cpf = cpfInput.value;
        let telefone = telefoneInput.value;
        let email = emailInput.value;

        // Formatando os campos antes de enviar
        cpfInput.value = formatarCPF(cpf);
        telefoneInput.value = formatarTelefone(telefone);

        // Validação
        if (!validarCPF(cpfInput.value)) {
            alert("CPF inválido!");
            event.preventDefault();
            return false;
        }

        if (!validarTelefone(telefoneInput.value)) {
            alert("Telefone inválido!");
            event.preventDefault();
            return false;
        }

        if (!validarEmail(emailInput.value)) {
            alert("Email inválido!");
            event.preventDefault();
            return false;
        }

        // Se tudo estiver correto
        alert("Formulário enviado com sucesso!");
        return true;
    });
});
