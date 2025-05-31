import {createApp} from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import Layout from "./components/Layout.vue";
import UserRegister from "./components/User/UserRegister.vue";
import UserLogin from "./components/User/UserLogin.vue";
import DashboardLayout from "./components/DashboardLayout.vue";
import ContactList from "./components/Contact/ContactList.vue";
import UserProfile from "./components/User/UserProfile.vue";
import UserLogout from "./components/User/UserLogout.vue";
import ContactCreate from "./components/Contact/ContactCreate.vue";
import ContactEdit from "./components/Contact/ContactEdit.vue";
import ContactDetail from "./components/Contact/ContactDetail.vue";
import AddressCreate from "./components/Address/AddressCreate.vue";
import AddressEdit from "./components/Address/AddressEdit.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: () => {
                const isLoggedIn = !!localStorage.getItem("token")
                return isLoggedIn ? '/dashboard/contacts' : '/login'
            }
        },
        {
            path: '/',
            component: Layout,
            children: [
                {path: 'register', component: UserRegister},
                {path: 'login', component: UserLogin}
            ]
        },
        {
            component: DashboardLayout,
            path: '/dashboard',
            children: [
                {path: 'contacts', component: ContactList},
                {path: 'contacts/create', component: ContactCreate},
                {path: 'contacts/:id/edit', component: ContactEdit},
                {path: 'contacts/:id', component: ContactDetail},
                {path: 'contacts/:id/addresses/create', component: AddressCreate},
                {path: 'contacts/:id/addresses/:addressId/edit', component: AddressEdit},
                {path: 'users/profile', component: UserProfile},
                {path: 'users/logout', component: UserLogout}
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem("token")//cek apakah ada token yang ada di localstorage

    const publicPages = ['/login', '/register']//daftar halaman public yang tidak perlu login

    const authRequired = !publicPages.includes(to.path)//cek apakah halaman yang diminta ada di daftar public

    //jika user belum login dan minta halaman selain di daftar publik, maka arahkan ke halaman login
    if (authRequired && !isLoggedIn) {
        return next('/login')
    }

    //redirect ke halaman dashboard jika sudah login
    //untuk mencegah user yang sudah login mengakses halaman login dan register lagi
    if ((to.path === '/login' || to.path === '/register') && isLoggedIn) {
        return next('/dashboard/contacts')
    }

    //lanjutkan ke halaman yang diminta
    next()
})

createApp(App).use(router).mount('#app')
