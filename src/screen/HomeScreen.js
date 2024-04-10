import { FlatList, Image, SafeAreaView, Alert, StyleSheet, Modal, Text, TouchableOpacity, View, TextInput, Button, ToastAndroid } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addMotorBikeAPI, deleteBikeApi, fetchBikes, updateMotorBikeAPI } from '../redux/actions/motorbikeAction';
import Banner from '../component/banner';
import TextInputCustoms from '../component/textinput';
import * as ImagePicker from 'react-native-image-picker';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    withSpring,
} from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const HomeScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('')
    const [image, setImage] = useState(null);
    const initialOffset = 10;
    const [price, setPrice] = useState('')
    const [describe, setDescribe] = useState('')
    const [color, setColor] = useState('')

    const [id, setId] = useState('')
    const [update, setUpdate] = useState(false)
    const listBike = useSelector(state => state.listBike.listBike);
    const dispatch = useDispatch();
    const opacity = useSharedValue(0);

    const scale = useSharedValue(1);


    const offset = useSharedValue(initialOffset);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: offset.value }],
    }));

    React.useEffect(() => {
        offset.value = withRepeat(withSpring(-offset.value),-1,true);
    }, []);

    const handlePressIn = () => {
        scale.value = withSpring(0.7);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
    };

    const animatedStyleButton = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 5000 });
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    const ChooseImage = useCallback(() => {
        let options = {
            saveToPhotos: true,
            mediaType: 'photo',
            includeBase64: false,
            includeExif: true
        }
        ImagePicker.launchImageLibrary(options, setImage)
    }, []);

    useEffect(() => {
        console.log(image);
    }, [image])

    useEffect(() => {
        dispatch(fetchBikes())
    }, [dispatch])
    return (
        <SafeAreaView style={{ width: '100%', height: '100%' }}>
            <Banner uri={"https://dichvuphotoshop.net/wp-content/uploads/2021/03/banner-dep.jpg"} />
            <View style={{ flex: 1, padding: 10, backgroundColor: '#2ecc71' }}>
                <Animated.Text
                    style={[
                        { fontWeight: 'bold', fontSize: 30, color: 'white', marginBottom: 10 },
                        animatedStyle,
                    ]}>
                    Danh sách xe máy
                </Animated.Text>
                <FlatList
                    data={listBike}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => {
                        return <View style={{ width: '100%', padding: 10, height: 120, marginBottom: 10, flexDirection: 'row', backgroundColor: 'white', borderRadius: 10 }}>
                            <View style={{ flex: 1, marginRight: 15, justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{ width: 100, height: 100, backgroundColor: 'red', borderRadius: 10 }}
                                    source={
                                        { uri: item.image_ph32353 }
                                    }
                                />
                            </View>
                            <View style={{ flex: 2, justifyContent: 'center' }}>
                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17 }}>
                                    Name :{item.name_ph32353}
                                </Text>
                                <Text>
                                    Color:{item.color_ph32353}
                                </Text>
                                <Text>
                                    Price:{item.price_ph32353}
                                </Text>
                                <Text>
                                    Describe:{item.describe_ph32353}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={
                                    () => {
                                        Alert.alert('Thông báo', 'Bạn có chắc chắn muốn xóa bản ghi này không ?', [
                                            {
                                                text: 'Hủy',
                                                onPress: () => console.log('Cancel Pressed'),
                                                style: 'cancel',
                                            },
                                            {
                                                text: 'Xóa', onPress: () => {
                                                    dispatch(deleteBikeApi(item._id))
                                                        .then((result) => {
                                                            ToastAndroid.show("Xóa thành công", ToastAndroid.SHORT);
                                                        })
                                                        .catch((error) => {
                                                            console.error('Error deleting todo:', error);
                                                        });
                                                }
                                            },
                                        ]);
                                    }
                                }>
                                    <Text style={{ color: 'red', marginRight: 10 }}>
                                        Xóa
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={
                                    () => {
                                        setUpdate(true)
                                        setId(item._id)
                                        setColor(item.color_ph32353)
                                        setDescribe(item.describe_ph32353)
                                        setName(item.name_ph32353)
                                        setPrice(item.price_ph32353)
                                        setModalVisible(true)
                                    }
                                }>
                                    <Text style={{ color: 'blue' }}>
                                        Sửa
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }}>
                </FlatList>
                <AnimatedTouchableOpacity
                    onPress={
                        () => {
                            setUpdate(false)
                            setId("")
                            setColor("")
                            setImage(null)
                            setDescribe("")
                            setName("")
                            setPrice("")
                            setModalVisible(true)
                        }
                    }
                    style={[
                        {
                            position: 'absolute',
                            end: 40,
                            bottom: 40,
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            backgroundColor: 'orange',
                            justifyContent: 'center',
                            alignItems: 'center'
                        },
                        animatedStyles
                    ]}
                >
                    <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>+</Text>
                </AnimatedTouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: 350, height: 450, borderRadius: 20, justifyContent: 'space-evenly', alignItems: 'center', padding: 10, backgroundColor: 'white' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 25 }}>
                                {update ? "Sửa thông tin" : "Thêm xe máy"}
                            </Text>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
                                <Image
                                    resizeMode='contain'
                                    source={
                                        {
                                            uri: image == null ? "https://ung-dung.com/images/upanh_online/upanh.png" : image.assets[0].uri
                                        }
                                    }
                                    style={{ width: 100, height: 100 }}>
                                </Image>

                                <View style={{ justifyContent: 'center' }}>
                                    <Button onPress={ChooseImage} title='Chọn hình ảnh' />
                                </View>
                            </View>
                            <TextInputCustoms value={name} placeholder='Tên xe' onChangeText={(text) => setName(text)} />
                            <TextInputCustoms value={price + ""} placeholder='Giá bán' onChangeText={(text) => setPrice(text)} />
                            <TextInputCustoms value={describe} placeholder='Mô tả' onChangeText={(text) => setDescribe(text)} />
                            <TextInputCustoms value={color} placeholder='Màu sắc' onChangeText={(text) => setColor(text)} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                                <Button onPress={
                                    () => {
                                        setModalVisible(false)
                                    }
                                } title='Hủy' />
                                <Button onPress={
                                    () => {
                                        if (update == false) {
                                            if (image != null) {
                                                const formData = new FormData();
                                                formData.append('name_ph32353', name);
                                                formData.append('price_ph32353', price);
                                                formData.append('color_ph32353', color);
                                                formData.append('describe_ph32353', describe);
                                                formData.append('image_ph32353', {
                                                    uri: image.assets[0].uri,
                                                    type: image.assets[0].type,
                                                    name: image.assets[0].fileName,
                                                });
                                                dispatch(addMotorBikeAPI(formData)).then(() => {
                                                    ToastAndroid.show("Thêm thành công", ToastAndroid.SHORT)
                                                    setModalVisible(false)
                                                }).catch((error) => {
                                                    ToastAndroid.show("Thêm thất bại", ToastAndroid.SHORT)
                                                    console.log(error)
                                                })
                                            } else {
                                                ToastAndroid.show("Vui lòng chọn hình ảnh")
                                            }
                                        } else {
                                            //UPDATE
                                            if (image != null) {
                                                const formData = new FormData();
                                                formData.append('name_ph32353', name);
                                                formData.append('price_ph32353', price);
                                                formData.append('color_ph32353', color);
                                                formData.append('describe_ph32353', describe);
                                                formData.append('image_ph32353', {
                                                    uri: image.assets[0].uri,
                                                    type: image.assets[0].type,
                                                    name: image.assets[0].fileName,
                                                });
                                                dispatch(updateMotorBikeAPI({ id: id, formData: formData })).then(() => {
                                                    ToastAndroid.show("Sửa thành công", ToastAndroid.SHORT)
                                                    setModalVisible(false)
                                                }).catch((error) => {
                                                    ToastAndroid.show("Sửa thất bại", ToastAndroid.SHORT)
                                                    console.log(error)
                                                })
                                            } else {
                                                ToastAndroid.show("Vui lòng chọn hình ảnh")
                                            }
                                        }
                                    }

                                } title='Thêm' />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    bannerCss: {
        width: '100%',
        height: 200
    }
})