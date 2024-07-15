import { useLogin } from '../../hooks/useLogin';

export function LoginForm() {
  const { username, password, setUsername, setPassword, submit, hasFailed } =
    useLogin();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    submit();
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
      {hasFailed && <div>Login failed</div>}
    </form>
  );
}
