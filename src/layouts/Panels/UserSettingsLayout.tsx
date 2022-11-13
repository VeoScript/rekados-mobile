import React from 'react'
import TopHeader from '../../components/TopHeader'
import tw from 'twrnc'
import { fonts } from '../../styles/global'
import { MaterialIcon } from '../../utils/Icons'
import { Toast } from '../../utils/Toast'
import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useNavigate } from '../../utils/RootNavigation'
import { useUpdateAccount, useChangePassword } from '../../lib/ReactQuery'

interface TypedProps {
  user: any
  profileId: string
}

const UserSettingsLayout: React.FC<TypedProps> = ({ user, profileId }) => {

  const updateAccount = useUpdateAccount()
  const changePassword = useChangePassword()

  // loading state
  const [isUpdateAccountLoading, setIsUpdateAccountLoading] = React.useState<boolean>(false)
  const [isChangePasswordLoading, setIsChangePasswordLoading] = React.useState<boolean>(false)

  // form state
  const [name, setName] = React.useState<string>(user.name)
  const [username, setUsername] = React.useState<string>(user.username)
  const [email, setEmail] = React.useState<string>(user.email)
  const [location, setLocation] = React.useState<string>(user.location ?? '')
  const [bio, setBio] = React.useState<string>(user.bio ?? '')
  
  const [oldPassword, setOldPassword] = React.useState<string>('')
  const [newPassword, setNewPassword] = React.useState<string>('')
  const [rePassword, setRePassword] = React.useState<string>('')

  // validation state
  const [nameError, setNameError] = React.useState<string>('')
  const [usernameError, setUsernameError] = React.useState<string>('')
  const [emailError, setEmailError] = React.useState<string>('')
  const [locationError, setLocationError] = React.useState<string>('')
  const [bioError, setBioError] = React.useState<string>('')
  const [oldPasswordError, setOldPasswordError] = React.useState<string>('')
  const [newPasswordError, setNewPasswordError] = React.useState<string>('')
  const [rePasswordError, setRePasswordError] = React.useState<string>('')

  const [updateAccountError, setUpdateAccountError] = React.useState<string>('')
  const [changePasswordError, setChangePasswordError] = React.useState<string>('')

  const [commentHeight, setCommentHeight] = React.useState<number>(10)

  const onUpdateAccount = async () => {
    if (name === '' || /^\s*$/.test(name)) {
      setNameError('Name is required')
    } else if (username === '' || /^\s*$/.test(username)) {
      setUsernameError('Username is required')
    } else if (email === '' || /^\s*$/.test(email)) {
      setEmailError('Email is required')
    } else if (location === '' || /^\s*$/.test(location)) {
      setLocationError('Location is required')
    } else if (bio === '' || /^\s*$/.test(bio)) {
      setBioError('Bio is required')
    } else {
      clearErrorState()
      setIsUpdateAccountLoading(true)
      await updateAccount.mutateAsync({
        id: profileId,
        name: name,
        username: username,
        email: email,
        location: location,
        bio: bio
      },
      {
        onError: (error: any) => {
          setUpdateAccountError(error.response?.data?.message)
          clearFormState()
          clearErrorState()
          setIsUpdateAccountLoading(false)
        },
        onSuccess: async () => {
          Toast('Account Updated Successfully')
          setUpdateAccountError('')
          clearFormState()
          clearErrorState()
          setIsUpdateAccountLoading(false)
          useNavigate('UserScreen', { id: user.id })
        }
      })
    }
  }

  const onChangePassword = async () => {
    if (oldPassword === '' || /^\s*$/.test(oldPassword)) {
      setOldPasswordError('Old password is required')
    } else if (newPassword === '' || /^\s*$/.test(newPassword)) {
      setNewPasswordError('New password is required')
    } else if (rePassword === '' || /^\s*$/.test(rePassword)) {
      setRePasswordError('Re-enter password is required')
    } else if (newPassword !== rePassword) {
      setRePasswordError('Password did not match')
    } else {
      clearErrorState()
      setIsChangePasswordLoading(true)
      await changePassword.mutateAsync({
        id: profileId,
        newPassword: newPassword,
        oldPassword: oldPassword
      },
      {
        onError: (error: any) => {
          setChangePasswordError(error.response?.data?.message)
          setIsChangePasswordLoading(false)
        },
        onSuccess: async () => {
          Toast('Password Updated Successfully')
          setChangePasswordError('')
          clearFormState()
          clearErrorState()
          setIsChangePasswordLoading(false)
          useNavigate('UserScreen', { id: user.id })
        }
      })
    }
  }
  
  const validateEmail = (text: string) => {
    let regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

    if (regex.test(text) === false) {
      setEmailError('Email is invalid.')
      setEmail(text)
      return false
    } else {
      setEmail(text)
      clearErrorState()
    }
  }

  const clearFormState = () => {
    setName(user.name)
    setUsername(user.username)
    setEmail(user.email)
    setLocation(user.location)
    setBio(user.bio)
    setOldPassword('')
    setNewPassword('')
    setRePassword('')
  }

  const clearErrorState = () => {
    setNameError('')
    setUsernameError('')
    setEmailError('')
    setLocationError('')
    setBioError('')
    setOldPasswordError('')
    setNewPasswordError('')
    setRePasswordError('')
    setUpdateAccountError('')
    setChangePasswordError('')
  }

  return (
    <View style={tw`flex-1 w-full h-full`}>
      <ScrollView contentContainerStyle={tw`flex-col w-full`} keyboardShouldPersistTaps="handled">
        <TopHeader
          title="Account Settings"
          subtitle="Update your account"
        />
        <View style={tw`flex-col w-full px-3`}>
          {updateAccountError && (
            <View style={tw`flex flex-row items-center w-full my-3 px-5 py-3 overflow-hidden rounded-xl bg-red-300`}>
              <MaterialIcon
                name="x-circle-fill"
                size="medium"
                color="#FF7D7D"
              />
              <Text style={[tw`-ml-5 w-full text-center text-sm text-[#FFFFFF]`, fonts.fontPoppinsLight]}>{ updateAccountError }</Text>
            </View>
          )}
          <View style={tw`flex-col w-full`}>
            <Text style={[tw`mx-2 mb-2 text-xl text-neutral-400`, fonts.fontPoppinsBold]}>Your Information</Text>
            <View style={tw`flex flex-col my-1 w-full`}>
              <View style={tw`flex flex-row items-center mx-2 mb-1`}>
                <Text style={[tw`text-sm text-neutral-600 dark:text-neutral-400`, fonts.fontPoppinsLight]}>Name</Text>
              </View>
              <TextInput
                style={[tw`flex w-full px-3 py-2 text-sm text-black dark:text-white rounded-xl border border-neutral-200 dark:border-[#383838] bg-white dark:bg-[#383838]`, fonts.fontPoppins]}
                editable={!isUpdateAccountLoading}
                value={name}
                onChangeText={(text: string) => {
                  setName(text)
                  setNameError('')
                }}
              />
              {nameError && <Text style={[tw`text-xs text-red-600 mx-2 my-1`, fonts.fontPoppinsLight]}>{ nameError }</Text>}
            </View>
            <View style={tw`flex flex-col my-1 w-full`}>
              <View style={tw`flex flex-row items-center mx-2 mb-1`}>
                <Text style={[tw`text-sm text-neutral-600 dark:text-neutral-400`, fonts.fontPoppinsLight]}>Username</Text>
              </View>
              <TextInput
                style={[tw`flex w-full px-3 py-2 text-sm text-black dark:text-white rounded-xl border border-neutral-200 dark:border-[#383838] bg-white dark:bg-[#383838]`, fonts.fontPoppins]}
                editable={!isUpdateAccountLoading}
                value={username}
                onChangeText={(text: string) => {
                  setUsername(text)
                  setUsernameError('')
                }}
              />
              {usernameError && <Text style={[tw`text-xs text-red-600 mx-2 my-1`, fonts.fontPoppinsLight]}>{ usernameError }</Text>}
            </View>
            <View style={tw`flex flex-col my-1 w-full`}>
              <View style={tw`flex flex-row items-center mx-2 mb-1`}>
                <Text style={[tw`text-sm text-neutral-600 dark:text-neutral-400`, fonts.fontPoppinsLight]}>Email</Text>
              </View>
              <TextInput
                style={[tw`flex w-full px-3 py-2 text-sm text-black dark:text-white rounded-xl border border-neutral-200 dark:border-[#383838] bg-white dark:bg-[#383838]`, fonts.fontPoppins]}
                editable={false}
                value={email}
                onChangeText={(text: string) => {
                  validateEmail(text)
                }}
              />
              {emailError && <Text style={[tw`text-xs text-red-600 mx-2 my-1`, fonts.fontPoppinsLight]}>{ emailError }</Text>}
            </View>
            <View style={tw`flex flex-col my-1 w-full`}>
              <View style={tw`flex flex-row items-center mx-2 mb-1`}>
                <Text style={[tw`text-sm text-neutral-600 dark:text-neutral-400`, fonts.fontPoppinsLight]}>Location</Text>
              </View>
              <TextInput
                style={[tw`flex w-full px-3 py-2 text-sm text-black dark:text-white rounded-xl border border-neutral-200 dark:border-[#383838] bg-white dark:bg-[#383838]`, fonts.fontPoppins]}
                editable={!isUpdateAccountLoading}
                value={location}
                onChangeText={(text: string) => {
                  setLocation(text)
                  setLocationError('')
                }}
              />
              {locationError && <Text style={[tw`text-xs text-red-600 mx-2 my-1`, fonts.fontPoppinsLight]}>{ locationError }</Text>}
            </View>
            <View style={tw`flex flex-col my-1 w-full`}>
              <View style={tw`flex flex-row items-center mx-2 mb-1`}>
                <Text style={[tw`text-sm text-neutral-600 dark:text-neutral-400`, fonts.fontPoppinsLight]}>Bio</Text>
              </View>
              <View style={tw`flex-row items-start w-full px-3 py-1 rounded-xl border border-neutral-200 dark:border-[#383838] bg-white bg-white dark:bg-[#383838]`}>
                <TextInput
                  style={[tw`w-full text-sm text-black dark:text-white bg-white dark:bg-[#383838]`, { height: commentHeight }, fonts.fontPoppins]}
                  editable={!isUpdateAccountLoading}
                  multiline={true}
                  numberOfLines={commentHeight}
                  value={bio}
                  onChangeText={(text: string) => {
                    setBio(text)
                    setBioError('')
                  }}
                  onContentSizeChange={(e) => {
                    setCommentHeight(e.nativeEvent.contentSize.height)
                  }}
                />
              </View>
              {bioError && <Text style={[tw`text-xs text-red-600 mx-2 my-1`, fonts.fontPoppinsLight]}>{ bioError }</Text>}
            </View>
            {isUpdateAccountLoading
              ? <View style={tw`flex flex-row items-center justify-center w-full my-1 p-3 text-sm rounded-xl bg-[#f2b900] bg-opacity-50`}>
                  <Text style={[tw`text-base text-white`, fonts.fontPoppins]}>Updating...</Text>
                </View>
              : <TouchableOpacity
                  style={tw`flex flex-row items-center justify-center w-full my-1 p-3 text-sm rounded-xl bg-[#f2b900]`}
                  activeOpacity={0.7}
                  onPress={onUpdateAccount}
                >
                  <Text style={[tw`text-base text-white`, fonts.fontPoppins]}>Save</Text>
                </TouchableOpacity>
            }
          </View>
          <View style={tw`flex-col w-full my-3`}>
            {changePasswordError && (
              <View style={tw`flex flex-row items-center w-full my-3 px-5 py-3 overflow-hidden rounded-xl bg-red-300`}>
                <MaterialIcon
                  name="x-circle-fill"
                  size="medium"
                  color="#FF7D7D"
                />
                <Text style={[tw`-ml-5 w-full text-center text-sm text-[#FFFFFF]`, fonts.fontPoppinsLight]}>{ changePasswordError }</Text>
              </View>
            )}
            <Text style={[tw`mx-2 mb-2 text-xl text-neutral-400`, fonts.fontPoppinsBold]}>Change Password</Text>
            <View style={tw`flex flex-col my-1 w-full`}>
              <View style={tw`flex flex-row items-center mx-2 mb-1`}>
                <Text style={[tw`text-sm text-neutral-600 dark:text-neutral-400`, fonts.fontPoppinsLight]}>Old Password</Text>
              </View>
              <TextInput
                style={[tw`flex w-full px-3 py-2 text-sm text-black dark:text-white rounded-xl border border-neutral-200 dark:border-[#383838] bg-white dark:bg-[#383838]`, fonts.fontPoppins]}
                editable={!isChangePasswordLoading}
                secureTextEntry={true}
                value={oldPassword}
                onChangeText={(text: string) => {
                  setOldPassword(text)
                  setOldPasswordError('')
                }}
              />
              {oldPasswordError && <Text style={[tw`text-xs text-red-600 mx-2 my-1`, fonts.fontPoppinsLight]}>{ oldPasswordError }</Text>}
            </View>
            <View style={tw`flex flex-col my-1 w-full`}>
              <View style={tw`flex flex-row items-center mx-2 mb-1`}>
                <Text style={[tw`text-sm text-neutral-600 dark:text-neutral-400`, fonts.fontPoppinsLight]}>New Password</Text>
              </View>
              <TextInput
                style={[tw`flex w-full px-3 py-2 text-sm text-black dark:text-white rounded-xl border border-neutral-200 dark:border-[#383838] bg-white dark:bg-[#383838]`, fonts.fontPoppins]}
                editable={!isChangePasswordLoading}
                secureTextEntry={true}
                value={newPassword}
                onChangeText={(text: string) => {
                  setNewPassword(text)
                  setNewPasswordError('')
                }}
              />
              {newPasswordError && <Text style={[tw`text-xs text-red-600 mx-2 my-1`, fonts.fontPoppinsLight]}>{ newPasswordError }</Text>}
            </View>
            <View style={tw`flex flex-col my-1 w-full`}>
              <View style={tw`flex flex-row items-center mx-2 mb-1`}>
                <Text style={[tw`text-sm text-neutral-600 dark:text-neutral-400`, fonts.fontPoppinsLight]}>Re-enter Password</Text>
              </View>
              <TextInput
                style={[tw`flex w-full px-3 py-2 text-sm text-black dark:text-white rounded-xl border border-neutral-200 dark:border-[#383838] bg-white dark:bg-[#383838]`, fonts.fontPoppins]}
                editable={!isChangePasswordLoading}
                secureTextEntry={true}
                value={rePassword}
                onChangeText={(text: string) => {
                  setRePassword(text)
                  setRePasswordError('')
                }}
              />
              {rePasswordError && <Text style={[tw`text-xs text-red-600 mx-2 my-1`, fonts.fontPoppinsLight]}>{ rePasswordError }</Text>}
            </View>
            {isChangePasswordLoading
              ? <View style={tw`flex flex-row items-center justify-center w-full my-1 p-3 text-sm rounded-xl bg-neutral-600 bg-opacity-50`}>
                  <Text style={[tw`text-base text-white`, fonts.fontPoppins]}>Updating...</Text>
                </View>
              : <TouchableOpacity
                  style={tw`flex flex-row items-center justify-center w-full my-1 p-3 text-sm rounded-xl bg-neutral-600`}
                  activeOpacity={0.7}
                  onPress={onChangePassword}
                >
                  <Text style={[tw`text-base text-white`, fonts.fontPoppins]}>Update Password</Text>
                </TouchableOpacity>
            }
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default UserSettingsLayout