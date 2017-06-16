/**
 * Created by Iamnauber on 2017-06-14.
 */

export function changeView(event){
    return {
        type: 'CHANGE_VIEW',
        payload: event
    }

}

export function LogIn(){
    return {
        type: 'LOG_IN'
    }

}

export function LogOut(){
    return {
        type: 'LOG_OUT'
    }

}
