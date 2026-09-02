<template>
    <div class="intro">
        <h1>Welcome Back</h1>
        <p>
            Sign in to access your dashboard, manage projects, and stay
            connected with the BEEP SOFTWARE team.
        </p>
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
}

@media (max-width: 640px) {
    .intro {
        max-width: 34rem;
        padding: 0;
    }

    .intro h1 {
        font-size: 2rem;
    }
}
</style>
