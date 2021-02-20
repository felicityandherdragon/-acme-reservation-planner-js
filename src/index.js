console.log('hello');
import axios from 'axios';

const userList = document.querySelector('#user_list');
const restaurantList = document.querySelector('#rest_list');
const reservationList = document.querySelector('#reser_list');
 
const renderUsers = async(users) =>{
    const html = users.map(user =>`
    <li>
    <a href='#${user.id}'>
    ${user.name}
    </a>
    </li>
    `).join('');
    userList.innerHTML = html;
    console.log(html);
};

const renderRestaurants = async(restaurants) =>{
    const html = restaurants.map(restaurant =>`
    <li>
    <a href='#${restaurant.id}'>
    ${restaurant.name}
    </a>
    </li>
    `).join('');
    restaurantList.innerHTML = html;
    console.log(html);
};
 
const init = async() =>{
    try{
        const users = (await axios.get('/api/users')).data;
        const restaurants = (await axios.get('/api/restaurants')).data;
        renderUsers(users);
        renderRestaurants(restaurants);
    }
    catch(ex){
        console.log(ex);
    }
}
init();