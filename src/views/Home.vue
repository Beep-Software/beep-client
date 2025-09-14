<template>
    <main>
        <nav>
            <ul>
                <li>
                    <a href="home">
                        <!-- Home / Features icon -->
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="contact">
                        <!-- Contact / Email icon -->
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="career">
                        <!-- Career / Briefcase icon -->
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 2H14V6H10V2ZM4 8V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8H4ZM6 10H18V20H6V10Z"/>
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="documentation">
                        <!-- Documentation / File icon -->
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM14 9V3.5L19.5 9H14Z"/>
                        </svg>
                    </a>
                </li>
            </ul>
        </nav>
        <div class="left">
            <img src="../../public/full_logo.png" alt="BEEP SOFTWARE" width="1000" height="1000" />
        </div>
        <div class="right">
            <div class="r-content">
                <h1>Welcome to BEEP SOFTWARE</h1>
                <p>
                    We build modern, efficient, and scalable software solutions for businesses 
                    that want to stay ahead of the curve.
                </p>
                <div class="buttons">
                    <button class="btn primary">Get Started</button>
                    <button class="btn secondary">Learn More</button>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
</script>

<style scoped>
main {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100vh;
}

nav {
    position: absolute;
    left: 45%;
    background-color: #111;
    color: #fff;
    padding: 1rem;
    margin-left: 1rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.4);
    border-radius: 12px;
    z-index: 2;
}

nav:hover {
    transform: translate(-2px);
}

nav ul {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

nav li:hover {
    transform: scale(1.2);
}

.left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 45%;
    height: 100%;
    box-shadow: 2px 0 10px rgba(0,0,0,0.3);
    z-index: 1;
    font-size: 2rem;
    font-weight: bold;
}

.right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 55%;
    height: 100%;
    background-color: #eee;
    color: #333;
    padding: 2rem;
}

.r-content {
    max-width: 500px;
    text-align: center;
}

.r-content h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #111;
}

.r-content p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    line-height: 1.5;
}

.buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

.btn {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s ease;
}

.btn.primary {
    background: #111;
    color: #fff;
}

.btn.primary:hover {
    background: #333;
}

.btn.secondary {
    background: #ddd;
    color: #111;
}

.btn.secondary:hover {
    background: #ccc;
}
</style>
