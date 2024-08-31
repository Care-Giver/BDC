import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import Icon from 'react-native-vector-icons/Ionicons';

const REGEX_KOREAN = /^[가-힣]+$/;
const REGEX_NUMBER = /^[0-9]+$/;

export default function App() {
	const [petInfo, setPetInfo] = useState({
		type: 0,
		name: "",
		birthday: "",
		breedType: 0,
		breed: "",
		weight: -1,
		gender: 0,
		neuter: 0,
	});
	const [nameValid, setNameValid] = useState(true);
	const [birthdayVaild, setBrithdayVaild] = useState(true);
	const [breedVaild, setBreedVaild] = useState(true);
	const [weightVaild, setWeightVaild] = useState(true);
	const [name, setName] = useState("");
	const [birthday, setBirthday] = useState("");
	const [breed, setBreed] = useState("");
	const [weight, setWeight] = useState("");
	const [state, setState] = useState(0);

	useEffect(() => {
		stateSelecter();
	}, [petInfo]);

	const stateSelecter = () => {
		let newState = 0;

		const conditions = [
			petInfo.type !== 0,
			petInfo.name !== "",
			petInfo.birthday !== "",
			(petInfo.breedType === 1 && petInfo.breed !== "") || petInfo.breedType === 2,
			petInfo.weight !== -1,
			petInfo.gender !== 0,
			petInfo.neuter !== 0
		];
	
		for (let i = 0; i < conditions.length; i++) {
			if (conditions[i]) 
				newState = i + 1;
			else 
				break;
		}

		setState(newState);
	}

	const onPressGender = (gender) => {
		setPetInfo(prevInfo => ({ ...prevInfo, gender }));
		
	};

	const onPressNeuter = (neuter) => {
		setPetInfo(prevInfo => ({ ...prevInfo, neuter }));
		
	};

	const petTypeSelection = (type) => {
		setPetInfo(prevInfo => ({ ...prevInfo, type }));
		
	};

	const petBreedTypeSelection = (breedType) => {
		setPetInfo(prevInfo => ({...prevInfo, breedType }));
		
		if (breedType === 1 && breed === "" && petInfo.breedType === 2)
		{
			setBreedVaild(false);
			setPetInfo(prevInfo => ({ ...prevInfo, breed: "" }));
			return;
		}
		
	};

	const checkPetName = () => {
		if (name.length > 10 || name === "" || !REGEX_KOREAN.test(name)) {
			setNameValid(false);
			setPetInfo(prevInfo => ({ ...prevInfo, name: "" }));
			return;
		}
		setNameValid(true);
		setPetInfo(prevInfo => ({ ...prevInfo, name }));
		
	};

	const checkVaildDate = ((dateString) => {
		const date = new Date(dateString);
		const todayDate = new Date();
		date.setHours(0, 0, 0, 0);
		todayDate.setHours(0, 0, 0, 0);
		if (todayDate < date)
			return false;
		const [year, month, day] = dateString.split("-").map(Number);
		return (date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day);
	});

	const checkPetBirthday = () => {
		if (birthday.length !== 8 ||
			birthday === "" || !REGEX_NUMBER.test(birthday) ||
			!checkVaildDate(birthday.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')))
		{
			setBrithdayVaild(false);
			setPetInfo(prevInfo => ({...prevInfo, birthday: ""}));
			return;
		}
		const birth = birthday.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
		setBrithdayVaild(true);
		setBirthday(birth);
		setPetInfo(prevInfo => ({...prevInfo, birthday: birth }));
		
	};

	const checkPetBreed = () => {
		if (breed === "" || !REGEX_KOREAN.test(breed))
		{
			setBreedVaild(false);
			setPetInfo(prevInfo => ({ ...prevInfo, breed: "" }));
			return;
		}
		setBreedVaild(true);
		setPetInfo(prevInfo => ({ ...prevInfo, breed }));
		
	};

	const checkVaildWeight = (weight) => {
		const num = parseFloat(weight);

		if (isNaN(num) || num < 0 || num > 99)
			return false;

		const decimal = weight.indexOf('.');
		if (weight.length === decimal + 1 || weight.split('.').length > 2)
			return false;
		if (decimal === -1)
			return true;
		return weight.length - decimal - 1 <= 2;
	};

	const checkPetWeight = () => {
		if (weight === "" || !checkVaildWeight(weight))
		{
			setWeightVaild(false);
			setPetInfo(prevInfo => ({ ...prevInfo, weight: -1 }));
			return;
		}
		setWeightVaild(true);
		setWeight(weight + "kg");
		setPetInfo(prevInfo => ({ ...prevInfo, weight: parseFloat(weight) }));
		
	};

	const handleBirthdayFocus = () => {
		setBirthday(birthday.replaceAll("-", "").trim());
	};

	const handleWeightFocus = () => {
		setWeight(weight.replace("kg", "").trim());
	};

	const genderOption = [
		{ id: 1, label: '남', containerStyle: { flex: 1 } },
		{ id: 2, label: '여', containerStyle: { flex: 1 } },
	]

	const neuterOption = [
		{ id: 1, label: '했어요', containerStyle: { flex: 1 } },
		{ id: 2, label: '안했어요', containerStyle: { flex: 1 } },
	]

	const onPressNext = () => {
		Alert.alert("확인",
			`
			종류 : ${petInfo.type === 1 ? "강아지" : "고양이"}
			이름 : ${petInfo.name}
			생년월일 : ${petInfo.birthday}
			${petInfo.breedType === 1 ? `품종 : ${petInfo.breed}` : ""}
			몸무게 : ${petInfo.weight}
			성별 : ${petInfo.gender === 1 ? "남" : "여"}
			중성화 여부 : ${petInfo.neuter === 1 ? "유" : "무"}
			`.replace(/^\s*[\r\n]/gm, '')
		);
	};

	console.log(petInfo);
	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<TouchableOpacity style={{ marginRight: 10 }}>
					<Icon name="chevron-back" size={30} color="black" />
				</TouchableOpacity>
				<Text style={styles.title}>
					반려동물 등록
				</Text>
			</View>
			<ScrollView style={styles.scrollContainer}>
				<Text style={styles.infoTitle}>
					반려동물에 대한 정보를 알려주세요!
				</Text>

				<View style={styles.petContainer}>
					<Text style={styles.label}>
						종류
					</Text>
					<View style={styles.buttonContainer}>
						<TouchableOpacity 
							onPress={() => petTypeSelection(1)}
							style={[petInfo.type === 1 ? styles.selectButton : styles.button, {marginRight: 10}]}>
								<Text style={petInfo.type === 1 ? styles.selectButtonText : styles.buttonText}>
									강아지
								</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => petTypeSelection(2)}
							style={petInfo.type === 2 ? styles.selectButton : styles.button}>
								<Text style={petInfo.type === 2 ? styles.selectButtonText : styles.buttonText}>
									고양이
								</Text>
						</TouchableOpacity>
					</View>
				</View>

				{(state >= 1) && (
					<View style={styles.petContainer}>
						<Text style={styles.label}>
							이름
						</Text>
						<TextInput
							style={{...styles.input, borderBottomColor: nameValid ? "#ccc" : "red"}}
							placeholder={"이름을 입력해주세요."}
							placeholderTextColor={"#ccc"}
							returnKeyType='done'
							onChangeText={(name) => setName(name)}
							onSubmitEditing={checkPetName}
							value={name}>
						</TextInput>
					</View>
				)}

				{(state >= 2) && (
					<View style={styles.petContainer}>
						<Text style={styles.label}>
							생년월일
						</Text>
						<TextInput
							style={{...styles.input, borderBottomColor: birthdayVaild ? "#ccc" : "red"}}
							placeholder={"예시) 2012-01-23"}
							placeholderTextColor={"#ccc"}
							returnKeyType='done'
							value={birthday}
							keyboardType='numeric'
							onChangeText={(birthday) => setBirthday(birthday)}
							onSubmitEditing={checkPetBirthday}
							onFocus={handleBirthdayFocus}>
						</TextInput>
						<Text style={styles.desc}>
							*반려동물의 생일을 모를 경우 추정 생년월일을 입력해주세요.
						</Text>
					</View>
				)}

				{(state >= 3) && (
					<View style={styles.petContainer}>
						<Text style={styles.label}>
							품종
						</Text>
						<View style={styles.buttonContainer}>
							<TouchableOpacity
								onPress={() => petBreedTypeSelection(1)}
								style={[petInfo.breedType === 1 ? styles.selectButton : styles.button, {marginRight: 10}]}>
									<Text style={petInfo.breedType === 1 ? styles.selectButtonText : styles.buttonText}>
										품종 알아요
									</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => petBreedTypeSelection(2)}
								style={[petInfo.breedType === 2 ? styles.selectButton : styles.button]}>
									<Text style={petInfo.breedType === 2 ? styles.selectButtonText : styles.buttonText}>
										품종 몰라요
									</Text>
							</TouchableOpacity>
						</View>
						{(petInfo.breedType === 1) && (
							<TextInput
								style={{...styles.input, borderBottomColor: breedVaild ? "#ccc" : "red"}}
								placeholder={"품종을 입력해주세요."}
								placeholderTextColor={"#ccc"}
								returnKeyType='done'
								value={breed}
								onChangeText={(breed) => setBreed(breed)}
								onSubmitEditing={checkPetBreed}>
							</TextInput>
						)}
					</View>
				)}

				{(state >= 4) && (
					<View style={styles.petContainer}>
						<Text style={styles.label}>
							몸무게
						</Text>
						<TextInput
							style={{...styles.input, borderBottomColor: weightVaild ? "#ccc" : "red"}}
							placeholder={"몸무게를 입력해주세요."}
							placeholderTextColor={"#ccc"}
							returnKeyType='done'
							value={weight}
							keyboardType='numeric'
							onChangeText={(weight) => setWeight(weight)}
							onSubmitEditing={checkPetWeight}
							onFocus={handleWeightFocus}>
						</TextInput>
					
					</View>
				)}

				{(state >= 5) && (
					<View style={styles.petContainer}>
						<Text style={styles.label}>
							성별
						</Text>
						<RadioGroup
							containerStyle={styles.radioButtonContainer}
							radioButtons={genderOption}
							onPress={onPressGender}
							layout='row'
							selectedId={petInfo.gender}
							labelStyle={styles.radioButtonLabel}
						></RadioGroup>
					</View>
				)}

				{(state >= 6) && (
					<View style={styles.petContainer}>
					<Text style={styles.label}>
						중성화 여부
					</Text>
					<RadioGroup
						containerStyle={styles.radioButtonContainer}
						radioButtons={neuterOption}
						onPress={onPressNeuter}
						layout='row'
						selectedId={petInfo.neuter}
						labelStyle={styles.radioButtonLabel}
					></RadioGroup>
				</View>
				)}

				{(state === 7) && (
					<View style={styles.petContainer}>
						<TouchableOpacity
							style={{...styles.button, borderColor: 'black'}}
							onPress={onPressNext}>
							<Text style={{...styles.buttonText, color: 'black'}}>
								다음
							</Text>
						</TouchableOpacity>
					</View>
				)}
			</ScrollView>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 15,
		backgroundColor: 'white',
	},
	titleContainer: {
		flexDirection: "row",
		marginTop: 50,
		marginBottom: 30,
	},
	title: {
		fontSize: 20,
	},
	scrollContainer: {
		flex: 1,
	},
	petContainer: {
		marginBottom: 30,
	},
	infoTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	label: {
		fontSize: 20,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	button: {
		flex: 1,
		marginTop: 10,
		padding: 10,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 10,
		alignItems: "center",
	},
	buttonText: {
		fontSize: 20,
		color: "#ccc",
	},
	selectButton: {
		flex: 1,
		marginTop: 10,
		padding: 10,
		borderWidth: 2.5,
		borderColor: '#7b8cb3',
		borderRadius: 10,
		alignItems: "center",
		backgroundColor: "#f8f8fa"
	},
	selectButtonText: {
		fontSize: 20,
		color: "black",
	},
	input: {
		borderBottomWidth: 2,
		marginTop: 10,
		fontSize: 20,
		paddingHorizontal: 10,
		paddingVertical: 10,
	},
	desc: {
		fontSize: 16,
		marginTop: 10,
		color: "grey",
	},
	radioButtonContainer: {
		marginTop: 10,
		flexDirection: 'row',
		marginHorizontal: -10,
	},
	radioButtonLabel: {
		fontSize: 20,
	}
});
