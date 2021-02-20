import React, { useEffect, Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    StyleSheet,
    Image,
    BackHandler
  } from 'react-native';
  

export class  HeaderBackClass extends Component {
    constructor(props) {
        super(props);
        this.onBackPressed = this.onBackPressed.bind(this);
    }

    componentWillMount() {
        BackHandler.addEventListener(
          'hardwareBackPress',
          this.onBackPressed,
        );
    }

    componentWillUnmount() {
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.onBackPressed,
        );
    }

    onLogoutPress = async() => {
        const {intl} = this.props;
        AppOkCancelAlert(intl.wantLogout, async() => {
            await api.user.logout();
            //this.props.store.dispatch(clearStore())
          /*  this.props.navigation.reset({
                index: 0,
                routes: [{name : LOGIN_ROUTE}]
            })*/
        }, () => {
            
        })
    }

    onBackPressed = () => {
        
        /*if(this.props.customBackEvent){
            this.props.customBackEvent();
            return true;
        }*/
        this.props.navigation.goBack()
        return true;
    }
    

    render(){
        const {letfIcon,leftIconPress, title, 
            rightIcon, rightIconPress, 
            isHiddenRightItem,customBackEvent, isHiddenLeftItem } = this.props;
        return  <View style={styles.mainContainer}>
                <View style={styles.container}>
                     <TouchableOpacity
                        style={[commonStyles.centerView, styles.leftIconContainer, styles.iconContainer]}
                        onPress={() => {
                            this.onBackPressed()
                        }}
                        >
                        <Icon name={"chevron-left"}
                            color={WHITE_COLOR} 
                            size={RFValue(24, STANDARD_SCREEN_HEIGHT)} />
                    </TouchableOpacity>
                   
                    
                    <View style={[styles.textContainer, {marginLeft : isHiddenLeftItem ? RFValue(16, STANDARD_SCREEN_HEIGHT) :  RFValue(4, STANDARD_SCREEN_HEIGHT)}]}>
                        <Text
                            numberOfLines={1}   
                            style={styles.textMain}>{title}</Text>
                    </View>
                  
                    
                    
                    <TouchableOpacity
                        style={[commonStyles.centerView,
                            styles.iconContainer, {
                            marginLeft: RFValue(4, STANDARD_SCREEN_HEIGHT),
                            marginRight: RFValue(12, STANDARD_SCREEN_HEIGHT)
                            }]}
                        onPress={this.onLogoutPress}
                        >
                        <Icon name={"power-off"}
                            color={WHITE_COLOR} size={RFValue(30, STANDARD_SCREEN_HEIGHT)} />
                    </TouchableOpacity>
                
            </View>    
    </View>
    }
}



const HeaderBack = (props) => {
    const intl = headerBackIntlProvider(props);
    const navigation = useNavigation();
    const store = useStore();

    return (
        <HeaderBackClass
            navigation={navigation}
            store={store}
            intl={intl}
            {...props}
        />
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        width:wp('100%'), 
        height: TOOLBAR_HEIGHT, 
        backgroundColor: THEME_COLOR,
    },
    container : {
        width:wp('100%'), 
        height: TOOLBAR_HEIGHT, 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconContainer : {
        width: RFValue(40, STANDARD_SCREEN_HEIGHT), 
        height:RFValue(40, STANDARD_SCREEN_HEIGHT)
    },
    leftIconContainer : {
        marginLeft: 10,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 0
    },

    textContainer: {
        flex:1,  
        marginLeft: RFValue(4, STANDARD_SCREEN_HEIGHT)
    },

    textMain : {
        fontSize: RFValue(LARGE_FONT_SIZE, STANDARD_SCREEN_HEIGHT), 
        fontFamily: FONT_MEDIUM, 
        color: WHITE_COLOR
    },

    textDesc: {
        fontSize: RFValue(EXTRA_SMALL_FONT_SIZE, STANDARD_SCREEN_HEIGHT), 
        fontFamily: FONT_BOLD, 
        color: WHITE_COLOR
    },

    badgeContainer : {
        top: 2,
        left: RFValue(20, STANDARD_SCREEN_HEIGHT),
        zIndex: RFValue(20, STANDARD_SCREEN_HEIGHT),
        borderRadius: RFValue(10, STANDARD_SCREEN_HEIGHT),
        overflow: 'hidden',
        position: 'absolute', 
        width: RFValue(20, STANDARD_SCREEN_HEIGHT), 
        height: RFValue(20, STANDARD_SCREEN_HEIGHT),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ee841f'
    },
    badgeText: {
        color: WHITE_COLOR,
        fontFamily: FONT_REGULAR,
        fontSize: EXTRA_SMALL_FONT_SIZE_1
    }
})

export default withGlobalize(HeaderBack);
