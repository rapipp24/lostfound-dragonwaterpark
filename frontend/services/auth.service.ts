export async function loginUser(data: {
  email: string;
  password: string;
}) {

  return {
    success: true,
    user: {
      email: data.email,
    },
  };
}