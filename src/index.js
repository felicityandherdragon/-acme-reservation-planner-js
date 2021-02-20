console.log('hello');
import axios from 'axios';

const userList = document.querySelector('#user_list');
const restaurantList = document.querySelector('#rest_list');
const reservationList = document.querySelector('#reser_list');

let currentUser;

const renderUsers = async(users) =>{
    const html = users.map(user =>`
        <li>
            <a href='#${user.id}'>
            ${user.name}
            </a>
        </li>
    `).join('');
    userList.innerHTML = html;
};

const renderRestaurants = async(restaurants) =>{
    const html = restaurants.map(restaurant =>`
        <li>
            ${restaurant.name}
            <button data-id='${restaurant.id}'>Add reservation</button>
        </li>
    `).join('');
    restaurantList.innerHTML = html;
};

const renderReservations = async(reservations) => {
    if (reservations.length !== 0) {
        const html = reservations.map(reservation => `
            <li>
                Booked for ${reservation.restaurant.name} at ${reservation.createdAt};
            </li>
            <button data-id='${reservation.id}'> X </a></button>
        `).join('');
        reservationList.innerHTML = html;
    } else {
        const html = '<li>No reservations made yet!</li>'
        reservationList.innerHTML = html;
    }
};

const init = async() =>{
    try {
        const users = (await axios.get('/api/users')).data;
        currentUser = window.location.hash.slice(1);
        const restaurants = (await axios.get('/api/restaurants')).data;
        renderUsers(users);
        renderRestaurants(restaurants);
        if (currentUser) {
            const reservations = (await axios.get(`/api/users/${currentUser}/reservations`)).data;
            renderReservations(reservations);
        }
    }
    catch(ex) {
        console.log(ex);
    }
}
init();

window.addEventListener('hashchange', async() => {
    currentUser = window.location.hash.slice(1);
    const users = (await axios.get('/api/users')).data;
    const restaurants = (await axios.get('/api/restaurants')).data;
    const reservations = (await axios.get(`/api/users/${currentUser}/reservations`)).data;
    renderUsers(users);
    renderRestaurants(restaurants);
    renderReservations(reservations);
})

restaurantList.addEventListener('click', async(ev) => {
    if (ev.target.tagName === 'BUTTON') {
        const restaurantId = ev.target.getAttribute('data-id');
        const currentRestaurant = {
            restaurantId
        };
        await axios.post(`/api/users/${currentUser}/reservations`,currentRestaurant).data;
    }
    const reservations = (await axios.get(`/api/users/${currentUser}/reservations`)).data;
    renderReservations(reservations);
})

reservationList.addEventListener('click', async(ev) => {
    if (ev.target.tagName === 'BUTTON') {
        const reservationId = ev.target.getAttribute('data-id');
        await axios.delete(`/api/reservations/${reservationId}`).data;
    }
    const reservations = (await axios.get(`/api/users/${currentUser}/reservations`)).data;
    renderReservations(reservations);
})
