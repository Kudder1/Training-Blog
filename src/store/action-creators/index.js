import * as UserActionCreators from './todo'
import * as TodoActionCreators from './user'

export default {
    ...TodoActionCreators,
    ...UserActionCreators
}