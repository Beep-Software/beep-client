<template>
    <div class="intro">
        <h1>Let's Talk</h1>
        <p>
            Have a project in mind or just want to say hello? Reach out and
            our team will get back to you shortly.
        </p>
        <ul class="details">
            <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>inquire@beepsoftware.com</span>
            </li>
            <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/>
                </svg>
                <span>Louisville, Kentucky</span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.intro {
    max-width: 380px;
    padding: 0 2rem;
}

.intro h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.intro p {
    font-size: 1.05rem;
    line-height: 1.6;
    color: #ccc;
    margin-bottom: 2.5rem;
}

.details {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.details li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1rem;
    color: #fff;
}

.details svg {
    flex-shrink: 0;
    color: #ccc;
}
</style>
