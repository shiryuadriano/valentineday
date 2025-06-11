document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submit-btn');
    const passwordInput = document.getElementById('password');
    const gameContainer = document.getElementById('game-container');
    const surpriseContainer = document.getElementById('surprise-container');
    const attemptsCount = document.getElementById('attempts-count');
    const hintContainer = document.getElementById('hint-container');
    const hintText = document.getElementById('hint-text');
    const backgroundMusic = document.getElementById('background-music');
    const countdownElement = document.getElementById('countdown');
    const cupid = document.querySelector('.cupid');
    
    let attempts = 0;
    const maxAttempts = 5;
    const correctPassword = '2000';
    
    // Adiciona o evento de clique para criar corações
    document.addEventListener('click', (e) => {
        createHeart(e.clientX, e.clientY);
    });

    // Adiciona evento de Enter no campo de senha
    document.getElementById('password').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });

    function createHeart(x, y) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        document.body.appendChild(heart);
        
        // Remove o coração após a animação
        setTimeout(() => {
            heart.remove();
        }, 2000);
    }

    // Adiciona corações caindo quando a surpresa é revelada
    function createFallingHearts() {
        for (let i = 0; i < 50; i++) {
            const heart = document.createElement('div');
            heart.className = 'falling-heart';
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            heart.style.opacity = Math.random() * 0.5 + 0.5;
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }
    }

    // Adiciona estilo para os corações caindo
    const style = document.createElement('style');
    style.textContent = `
        .falling-heart {
            position: fixed;
            top: -50px;
            animation: fallHeart linear forwards;
            pointer-events: none;
            z-index: 1000;
        }
        
        @keyframes fallHeart {
            0% {
                transform: translateY(0) rotate(0deg);
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);

    function showHint(message) {
        const hint = document.createElement('div');
        hint.className = 'hint';
        hint.innerHTML = `<p style="color: #ffffff !important; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">${message}</p>`;
        document.querySelector('.game-container').appendChild(hint);
    }

    // Função para iniciar a contagem regressiva
    function startCountdown() {
        let count = 10;
        countdownElement.textContent = count;
        
        const countdownInterval = setInterval(() => {
            count--;
            countdownElement.textContent = count;
            
            if (count <= 0) {
                clearInterval(countdownInterval);
                countdownElement.textContent = '❤️';
                
                // Toca a música quando o contador chega a zero
                backgroundMusic.classList.remove('hidden');
                backgroundMusic.volume = 0.7;
                backgroundMusic.play().catch(error => {
                    console.log('Erro ao tocar música:', error);
                    // Tenta tocar novamente se houver erro
                    setTimeout(() => {
                        backgroundMusic.play().catch(e => console.log('Erro ao tentar tocar novamente:', e));
                    }, 1000);
                });
            }
        }, 1000);
    }

    function checkPassword() {
        const passwordInput = document.getElementById('password');
        const attemptsElement = document.getElementById('attempts');
        const password = passwordInput.value;
        
        if (password === '2000') {
            // Redireciona para a página de surpresa
            window.location.href = 'surprise.html';
        } else {
            attempts++;
            attemptsElement.textContent = maxAttempts - attempts;
            
            if (attempts === 2) {
                showHint("Dica: É uma data...");
            } else if (attempts === 3) {
                showHint("Data onde o todo espaço tempo, futuro, presente e passado se encheu de amor e alegria!");
            } else if (attempts === 5) {
                showHint("A senha é: 2000");
                setTimeout(() => {
                    location.reload();
                }, 3000);
            }
            
            passwordInput.value = '';
            passwordInput.focus();
        }
    }

    submitBtn.addEventListener('click', checkPassword);
}); 