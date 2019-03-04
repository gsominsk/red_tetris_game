import params  from '../../params'
import * as server from './index'
server.create(params.server).then( () => console.log('Who in here tryna start a riot?'));
