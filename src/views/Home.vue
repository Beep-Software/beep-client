<template>
    <main>
        <div class="left">
            BEEP SOFTWARE
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
                <label>WooHoo?</label>
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
