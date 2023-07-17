import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    
  },
  imageView:{
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    backgroundColor:"grey"
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    marginBottom: 4,
  },
  editButton: {
    marginTop: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'blue',
    borderRadius: 4,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  });

  export default styles;