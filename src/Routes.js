import React from 'react';
import { 
    createBottomTabNavigator,
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator
} from 'react-navigation';
import Home from './screens/Home';
import OccurrencesReport from './screens/OccurrencesReport';
import Profile from './screens/Profile';
import ReportDetails from './screens/ReportDetails';
import Location from './screens/Location';
import TabBarComponent from './components/TabBarComponent';
import Signup from './screens/Signup';
import OccurrenceList from './screens/OccurrenceList';
import SigninSignup from './screens/SigninSignup';
import Auth from './screens/Auth';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeStackRoutes = createStackNavigator({
    'Home': {
        screen: Home,
        navigationOptions: {
            header: null,          
        }
    },
    'ReportDetails': {
        screen: ReportDetails,
        navigationOptions: {
            headerTitle: 'Denunciar'
        }
    },
    'Location': {
        screen: Location,
        navigationOptions: {
            headerTitle: 'Marcar Localização'
        }
    }
})

const ReportStackRoutes = createStackNavigator({
    'OccurrencesReport': {
        screen: OccurrencesReport,
        navigationOptions: {
            header: null
        }
    },
    'OccurrenceList': {
        screen: OccurrenceList,
        navigationOptions: {
            headerTitle: 'Lista de Ocorrência'
        }
    }
})

const ProfileSwitchRoutes = createSwitchNavigator({
    'SigninOrSignup': createStackNavigator({
        'SigninSignup': {
            screen: SigninSignup,
            navigationOptions: {
                header: null
            }
        },
        'Auth': {
            screen: Auth,
            navigationOptions: {
                headerTitle: 'Entrar'
            }
        },
        'Signup': {
            screen: Signup,
            navigationOptions: {
                headerTitle: 'Cadastrar'
            }
        }
    }),
    'Profile': createStackNavigator({
        'Profile': {
            screen: Profile,
            navigationOptions: {
                header: null,
            }
        },
        'MyOccorrences': {
            screen: OccurrenceList,
            navigationOptions: {
                headerTitle: 'Minhas ocorrências'
            }
        }
    })
})

const TabNavigator = createBottomTabNavigator({
    // 'Test': {
    //     screen: Test
    // },
    'Mapa': {
        screen: HomeStackRoutes,
        navigationOptions: {
            showIcon: true,
            tabBarIcon: ({ tintColor }) => 
                <Icon name='map' size={30} color={tintColor} />
            
        }
    },
    'Relatorio': {
        screen: ReportStackRoutes,
        navigationOptions: {
            showIcon: true,
            tabBarIcon: ({ tintColor }) => 
                <Icon name='assignment' size={30} color={tintColor} />
            
        }
    },
    'Perfil': {
        screen: ProfileSwitchRoutes,
        navigationOptions: {
            showIcon: true,
            tabBarIcon: ({ tintColor }) => 
                <Icon name='person' size={30} color={tintColor} />
            
        }
    }
}, {
    tabBarComponent: TabBarComponent,
    tabBarOptions: {
        scrollEnabled: true
    }
});

const AppContainer = createAppContainer(TabNavigator);

export default AppContainer;