import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';

//3rd party packages
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';

import axios from 'axios';

//constants

import strings from './src/constants/lng/LocalizedStrings';
import {fontFamily} from './src/styles/fontFamily';

//reusbale/custom components
import BtnComp from './src/components/BtnComp';

import {colors} from './src/styles/colors';
import {setLng, getLng} from './src/helper/changeLng';

const App = () => {
  // const [selectedCountry, setSelectedCountry] = useState('');
  // const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    //getCountryNames();

    selectedLng();
  }, []);

  const selectedLng = async () => {
    const lngData = await getLng();
    if (!!lngData) {
      strings.setLanguage(lngData);
    }
    console.log('selected Language data==>>>', lngData);
  };

  // const getCountryNames = async () => {
  //   try {
  //     const res = await axios.get('https://restcountries.eu/rest/v2/all');
  //     // console.log("res==>>>>", res)
  //     setAllCountries(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onChangeLng = async (lng) => {
    if (lng === 'en') {
      await I18nManager.forceRTL(false);
      setLng('en');
      RNRestart.Restart();
      return;
    }
    if (lng === 'hi') {
      await I18nManager.forceRTL(false);
      setLng('hi');
      RNRestart.Restart();
      return;
    }
    if (lng === 'ar') {
      await I18nManager.forceRTL(true);
      setLng('ar');
      RNRestart.Restart();
      return;
    }
  };
  return (
    <View style={styles.container}>
      <View style={{padding: 16}}>
        <Text style={styles.updateText}>{strings.CASE_UPDATE}</Text>
        <Text style={styles.newestText}>
          {strings.NEWEST_UPDATE}: {'11 Dec 2020'}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginVertical: moderateVerticalScale(12),
          }}>
          <BtnComp
            btnText={'For English'}
            onPress={() => onChangeLng('en')}
            bgColor={colors.bgRedColor}
            textColor={colors.redColor}
          />
          <BtnComp
            btnText={'For Hindi'}
            onPress={() => onChangeLng('hi')}
            bgColor={colors.bgGreenColor}
            textColor={colors.greenColor}
          />

          <BtnComp
            btnText={'For Arabic'}
            onPress={() => onChangeLng('ar')}
            bgColor={colors.bgGrayColor}
            textColor={colors.grayColor}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  updateText: {
    fontSize: moderateScale(20),
    fontFamily: fontFamily.medium,
    textAlign: 'left',
  },
  newestText: {
    fontSize: moderateScale(12),
    fontFamily: fontFamily.regular,
    marginTop: moderateVerticalScale(4),
    textAlign: 'left',
  },
  pickerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'gray',
    padding: moderateScale(6),
    height: moderateScale(48),
  },
  flexView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateVerticalScale(20),
    justifyContent: 'space-between',
  },
  conronTextStyle: {
    fontSize: moderateScale(14),
    fontFamily: fontFamily.medium,
    color: colors.redColor,
    textTransform: 'uppercase',
    alignSelf: 'center',
    marginVertical: moderateVerticalScale(16),
  },
});

export default App;
