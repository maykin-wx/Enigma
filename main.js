document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleciona o formulário e o campo de input
    const form = document.getElementById('enigma1');
    const inputCodigo = document.getElementById('codigo1');
    
    // Define a resposta correta
    const RESPOSTA_TEXTO = "SOMBRA";
    // O código "19 15 13 2 18 1" que está no título (S=19, O=15, M=13, B=2, R=18, A=1)
    const RESPOSTA_NUMERO = "1915132181"; 
    
    // Define o URL de destino
    const URL_DESTINO = "mantab";

    // 2. Adiciona o listener de evento para a submissão do formulário
    form.addEventListener('submit', function(event) {
        // Previne o comportamento padrão de envio do formulário (recarregar a página)
        event.preventDefault();

        // 3. Captura o valor digitado e o limpa/padroniza
        let valorDigitado = inputCodigo.value.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');

        let codigoCorreto = false;

        // Verifica se a resposta está correta (Texto ou Número)
        if (valorDigitado === RESPOSTA_TEXTO) {
            codigoCorreto = true;
        } 
        
        // Verifica se o valor é o código numérico sem espaços
        // Se o input for do tipo text no HTML, o usuário pode digitar "19 15 13 2 18 1"
        // Por isso removemos todos os caracteres não-alfanuméricos na padronização.
        else if (valorDigitado === RESPOSTA_NUMERO) {
            codigoCorreto = true;
        }

        // 4. Lógica de Redirecionamento e Feedback
        if (codigoCorreto) {
            // Sucesso: Ativa o efeito de loading do botão
            const button = form.querySelector('.neon-button');
            const btnText = button.querySelector('.btn-text');
            const btnLoader = button.querySelector('.btn-loader');
            
            btnText.textContent = "[ ACESSO CONCEDIDO ]";
            button.classList.add('loading');
            
            // Redireciona após um pequeno delay para mostrar o efeito
            setTimeout(() => {
                window.location.href = URL_DESTINO;
            }, 1500); // 1.5 segundos
            
        } else {
            // Erro: Dá um feedback visual/auditivo de falha
            
            // 5. Efeito de Erro (Glitch/Shake)
            inputCodigo.classList.add('error-shake');
            inputCodigo.value = "/// ERRO DE AUTENTICAÇÃO ///";
            
            // Remove o placeholder e reativa o campo após um tempo
            setTimeout(() => {
                inputCodigo.classList.remove('error-shake');
                inputCodigo.value = ''; // Limpa o campo
                inputCodigo.focus(); // Coloca o foco de volta
            }, 1000);
            
            // (Opcional) Você pode adicionar um som de erro aqui.
        }
    });
});