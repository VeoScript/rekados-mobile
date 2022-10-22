import React from 'react'
import TopHeader from '../../components/TopHeader'
import tw from 'twrnc'
import { fonts } from '../../styles/global'
import { MaterialIcon } from '../../utils/Icons'
import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useUpdateAccount } from '../../lib/ReactQuery'
import { Toast } from '../../utils/Toast'
import { useNavigate } from '../../utils/RootNavigation'

interface TypedProps {
  user: any
  profileId: string
}

const UserSettingsLayout: React.FC<TypedProps> = ({ user, profileId }) => {

  const updateAccount = useUpdateAccount()

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
  const [emailError, setEmailError] = React.useState<string>('')
  const [updateAccountError, setUpdateAccountError] = React.useState<string>('')

  const [commentHeight, setCommentHeight] = React.useState<number>(10)

  const onUpdateAccount = async () => {
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
      },
      onSuccess: async () => {
        Toast('Account Updated Successfully')
        setUpdateAccountError('')
        clearFormState()
        clearErrorState()
        useNavigate('UserScreen', { id: user.id })
      }
    })
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
  }

  const clearErrorState = () => {
    setEmailError('')
    setUpdateAccountError('')
  }

  return (
    <View style={tw`flex-1 w-full h-full`}>
      <ScrollView contentContainerStyle={tw`flex-col w-full`}>
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
                <Text style={[tw`text-sm text-neutral-600`, fonts.fontPoppinsLight]}>Name</Text>
              </View>
              <TextInput
                style={[tw`flex w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-white`, fonts.fontPoppins]}
                value={name}
                onChangeText={(text: string) => {
                  setName(text)
                }}
              />
            </View>
            <View style={tw`flex flex-col my-1 w-full`}>
              <View style={tw`flex flex-row items-center mx-2 mb-1`}>
                <Text style={[tw`text-sm text-neutral-600`, fonts.fontPoppinsLight]}>Username</Text>
              </View>
              <TextInput
                style={[tw`flex w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-white`, fonts.fontPoppins]}
                value={username}
                onChangeText={(text: string) => {
                  setUsername(text)
                }}
              />
            </View>
            <View style={tw`flex flex-col my-1 w-full`}>
              <View style={tw`flex flex-row items-center mx-2 mb-1`}>
                <Text style={[tw`text-sm text-neutral-600`, fonts.fontPoppinsLight]}>Email</Text>
              </View>
              <TextInput
                style={[tw`flex w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-white`, fonts.fontPoppins]}
                value={email}
                onChangeText={(text: string) => {
                  validateEmail(text)
                }}
              />
              {emailError && <Text style={[tw`text-xs text-red-600 mx-2 my-1`, fonts.fontPoppinsLight]}>{ emailError }</Text>}
            </View>
            <View style={tw`flex flex-col my-1 w-full`}>
              <View style={tw`flex flex-row items-center mx-2 mb-1`}>
                <Text style={[tw`text-sm text-neutral-600`, fonts.fontPoppinsLight]}>Location</Text>
              </View>
              <TextInput
                style={[tw`flex w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-white`, fonts.fontPoppins]}
                value={location}
                onChangeText={(text: string) => {
                  setLocation(text)
                }}
              />
            </View>
            <View style={tw`flex flex-col my-1 w-full`}>
              <View style={tw`flex flex-row items-center mx-2 mb-1`}>
                <Text style={[tw`text-sm text-neutral-600`, fonts.fontPoppinsLight]}>Bio</Text>
              </View>
              <View style={tw`flex-row items-start w-full px-3 py-1 rounded-xl border border-neutral-200 bg-white`}>
                <TextInput
                  style={[tw`w-full text-sm`, { height: commentHeight }, fonts.fontPoppins]}
                  multiline={true}
                  numberOfLines={commentHeight}
                  value={bio}
                  onChangeText={(text: string) => {
                    setBio(text)
                  }}
                  onContentSizeChange={(e) => {
                    setCommentHeight(e.nativeEvent.contentSize.height)
                  }}
                />
              </View>
            </View>
            <TouchableOpacity
              style={tw`flex flex-row items-center justify-center w-full my-1 p-3 text-sm rounded-xl bg-[#f2b900]`}
              activeOpacity={0.7}
              onPress={onUpdateAccount}
            >
              <Text style={[tw`text-base text-white`, fonts.fontPoppins]}>Save</Text>
            </TouchableOpacity>
          </View>
          <View style={tw`flex-col w-full my-3`}>
            <Text style={[tw`mx-2 mb-2 text-xl text-neutral-400`, fonts.fontPoppinsBold]}>Change Password</Text>
            <View style={tw`flex flex-col my-1 w-full`}>
              <View style={tw`flex flex-row items-center mx-2 mb-1`}>
                <Text style={[tw`text-sm text-neutral-600`, fonts.fontPoppinsLight]}>Old Password</Text>
              </View>
              <TextInput
                style={[tw`flex w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-white`, fonts.fontPoppins]}
                secureTextEntry={true}
              />
            </View>
            <View style={tw`flex flex-col my-1 w-full`}>
              <View style={tw`flex flex-row items-center mx-2 mb-1`}>
                <Text style={[tw`text-sm text-neutral-600`, fonts.fontPoppinsLight]}>New Password</Text>
              </View>
              <TextInput
                style={[tw`flex w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-white`, fonts.fontPoppins]}
                secureTextEntry={true}
              />
            </View>
            <View style={tw`flex flex-col my-1 w-full`}>
              <View style={tw`flex flex-row items-center mx-2 mb-1`}>
                <Text style={[tw`text-sm text-neutral-600`, fonts.fontPoppinsLight]}>Re-enter Password</Text>
              </View>
              <TextInput
                style={[tw`flex w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-white`, fonts.fontPoppins]}
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity
              style={tw`flex flex-row items-center justify-center w-full my-1 p-3 text-sm rounded-xl bg-neutral-600`}
              activeOpacity={0.7}
              onPress={() => {
                console.log('Sign In')
              }}
            >
              <Text style={[tw`text-base text-white`, fonts.fontPoppins]}>Update Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default UserSettingsLayout