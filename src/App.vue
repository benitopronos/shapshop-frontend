
<template>
  <div id="app" class="app">
    <!-- Header -->
    <header class="header">
      <div class="container">
        <div class="header-content">
          <router-link to="/" class="logo">SHAP<span>BENI</span></router-link>
          
          <div class="nav-center">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Rechercher..."
              class="search-input"
            />
          </div>

          <div class="nav-right">
            <button class="cart-btn" @click="goToCart" :data-count="cartCount">
              🛒
            </button>
            
            <button 
              v-if="!user"
              @click="goToLogin"
              class="btn btn-secondary"
            >
              Connexion
            </button>
            
            <div v-else class="user-menu">
              <span class="user-name">{{ user.name }}</span>
              <button @click="logout" class="btn btn-secondary">
                Déconnecter
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <p>© 2025 SHAP SHOP BENI · Email: tuobenitojean@gmail.com | Tél: 0596588375</p>
      </div>
    </footer>

    <!-- Toast -->
    <div v-if="toast.show" class="toast" :class="toast.type">
      {{ toast.message }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useStore } from './stores/store'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'App',
  data() {
    return {
      searchQuery: '',
      toast: {
        show: false,
        message: '',
        type: 'info'
      }
    }
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    return { store, router }
  },
  computed: {
    user() {
      return this.store.user
    },
    cartCount() {
      return this.store.cart.reduce((sum, item) => sum + item.quantity, 0)
    }
  },
  watch: {
    searchQuery(newVal) {
      this.store.searchQuery = newVal
    }
  },
  methods: {
    goToCart() {
      this.router.push('/cart')
    },
    goToLogin() {
      this.router.push('/login')
    },
    logout() {
      this.store.logout()
      this.router.push('/')
      this.showToast('👋 Déconnecté', 'info')
    },
    showToast(message, type = 'info') {
      this.toast = { show: true, message, type }
      setTimeout(() => {
        this.toast.show = false
      }, 3000)
    }
  },
  mounted() {
    this.store.loadUser()
    this.store.loadCart()
  }
})
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: var(--card);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  gap: 1rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--primary);
  text-decoration: none;
  letter-spacing: -0.5px;
  white-space: nowrap;
}

.logo span {
  color: var(--danger);
}

.nav-center {
  flex: 1;
  display: flex;
}

.search-input {
  width: 100%;
  max-width: 300px;
  padding: 0.625rem 1rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cart-btn {
  position: relative;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.cart-btn:hover {
  transform: scale(1.1);
}

.cart-btn::after {
  content: attr(data-count);
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--danger);
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-name {
  font-weight: 600;
  color: var(--text);
}

.main {
  flex: 1;
  padding: 2rem 0;
}

.footer {
  background: var(--text);
  color: white;
  padding: 2rem;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 4rem;
}

.footer p {
  opacity: 0.8;
}

.toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  z-index: 1000;
  animation: slideIn 0.3s ease;
}

.toast.info {
  background: var(--text);
  color: white;
}

.toast.success {
  background: var(--success);
  color: white;
}

.toast.error {
  background: var(--danger);
  color: white;
}

@keyframes slideIn {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .nav-center {
    display: none;
  }

  .header-content {
    gap: 0.5rem;
  }
}
</style>
