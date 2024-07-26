import { useLogin } from '../../hooks/useLogin';
import { Button } from '../Button/Button';
import { StyledLogin } from './style';

export function LoginForm() {
  const { username, password, setUsername, setPassword, submit, hasFailed } =
    useLogin();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    submit();
  };

  return (
    <StyledLogin onSubmit={handleLogin}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />

      <Button content="Login" />
      {hasFailed && <div>Login failed</div>}
    </StyledLogin>
  );
}
