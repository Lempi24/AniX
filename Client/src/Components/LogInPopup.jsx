import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../Context/AuthContext";
const LoginPopup = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { login } = useAuth();
  const [isLoging, setIsLoging] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const closeIcon =
    "M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z";
  const openEyeIcon =
    "M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320zM320 256C320 291.3 291.3 320 256 320C244.5 320 233.7 317 224.3 311.6C223.3 322.5 224.2 333.7 227.2 344.8C240.9 396 293.6 426.4 344.8 412.7C396 399 426.4 346.3 412.7 295.1C400.5 249.4 357.2 220.3 311.6 224.3C316.9 233.6 320 244.4 320 256z";
  const closeEyeIcon =
    "M73 39.1C63.6 29.7 48.4 29.7 39.1 39.1C29.8 48.5 29.7 63.7 39 73.1L567 601.1C576.4 610.5 591.6 610.5 600.9 601.1C610.2 591.7 610.3 576.5 600.9 567.2L504.5 470.8C507.2 468.4 509.9 466 512.5 463.6C559.3 420.1 590.6 368.2 605.5 332.5C608.8 324.6 608.8 315.8 605.5 307.9C590.6 272.2 559.3 220.2 512.5 176.8C465.4 133.1 400.7 96.2 319.9 96.2C263.1 96.2 214.3 114.4 173.9 140.4L73 39.1zM236.5 202.7C260 185.9 288.9 176 320 176C399.5 176 464 240.5 464 320C464 351.1 454.1 379.9 437.3 403.5L402.6 368.8C415.3 347.4 419.6 321.1 412.7 295.1C399 243.9 346.3 213.5 295.1 227.2C286.5 229.5 278.4 232.9 271.1 237.2L236.4 202.5zM357.3 459.1C345.4 462.3 332.9 464 320 464C240.5 464 176 399.5 176 320C176 307.1 177.7 294.6 180.9 282.7L101.4 203.2C68.8 240 46.4 279 34.5 307.7C31.2 315.6 31.2 324.4 34.5 332.3C49.4 368 80.7 420 127.5 463.4C174.6 507.1 239.3 544 320.1 544C357.4 544 391.3 536.1 421.6 523.4L357.4 459.2z";
  const onLoginSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        data,
        { headers: { "Content-Type": "application/json" } },
      );
      if (response.status === 200) {
        login(response.data.token, response.data.user);
        onClose();
        reset();
        toast.success(`Witaj ${response.data.user.username}!`);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Coś poszło nie tak.");
    } finally {
      setLoading(false);
    }
  };
  const onRegisterSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
        data,
        { headers: { "Content-Type": "application/json" } },
      );
      toast.success(response.data.message || "Rejestracja powiodła się!");
      setIsLoging(true);
      reset();
    } catch (error) {
      toast.error(error.response?.data?.error || "Coś poszło nie tak.");
    } finally {
      setLoading(false);
    }
  };

  const password = watch("password");

  if (!isOpen) return null;
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-main rounded-lg shadow-lg p-6 w-9/10 border-2 border-cta flex flex-col items-center gap-5 max-w-md"
      >
        <button
          onClick={onClose}
          className="border rounded-full p-1 ml-auto border-cta cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            className="w-5 fill-text-accent"
          >
            <path d={closeIcon} />
          </svg>
        </button>
        <h1 className="text-3xl text-cta font-bold">AniX</h1>
        <div className="p-2 bg-secondary rounded-2xl flex items-center justify-around w-full">
          <button
            onClick={() => {
              setIsLoging(true);
              reset();
            }}
            className={`p-2 font-bold rounded-xl cursor-pointer w-1/2 ${
              isLoging ? "bg-cta/30 text-cta" : ""
            }`}
          >
            Logowanie
          </button>
          <button
            onClick={() => {
              setIsLoging(false);
              reset();
            }}
            className={`p-2 font-bold rounded-xl cursor-pointer w-1/2 ${
              isLoging ? "" : "bg-cta/30 text-cta"
            }`}
          >
            Rejestracja
          </button>
        </div>
        {isLoging ? (
          <form
            onSubmit={handleSubmit(onLoginSubmit)}
            className="relative flex flex-col gap-5"
            noValidate
          >
            <div>
              <label htmlFor="" className="text-sm">
                Email lub nazwa użytkownika
              </label>
              <input
                {...register("username", { required: "To pole jest wymagane" })}
                type="text"
                placeholder="Wprowadź email lub nick"
                className="bg-secondary rounded-xl p-3 w-full mt-2 border-2 border-cta focus:outline-0"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm">Hasło</label>

              <div className="relative">
                <input
                  {...register("password", { required: "Podaj hasło" })}
                  type={showPassword ? "input" : "password"}
                  placeholder="Wprowadź hasło"
                  className="bg-secondary rounded-xl p-3 w-full border-2 border-cta focus:outline-0"
                />

                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    className="w-5 fill-cta"
                  >
                    <path d={showPassword ? closeEyeIcon : openEyeIcon} />
                  </svg>
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button className="ml-auto text-sm">Zapomniałeś hasła?</button>
            <div className="relative w-full">
              <button
                type="submit"
                className={`w-full  p-3 rounded-xl font-bold cursor-pointer ${
                  loading ? "border-2 border-cta pointer-events-none" : "bg-cta"
                }`}
              >
                <span className={`${loading ? "invisible" : ""}`}>
                  Zaloguj się
                </span>
                {loading && (
                  <div className="absolute flex items-center justify-center inset-0">
                    <div className="w-6 h-6 border-4 border-cta border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </button>
            </div>
          </form>
        ) : (
          <form
            onSubmit={handleSubmit(onRegisterSubmit)}
            className="relative flex flex-col gap-5"
            noValidate
          >
            <div>
              <label className="text-sm">Nazwa użytkownika</label>
              <input
                {...register("username", { required: "To pole jest wymagane" })}
                type="text"
                placeholder="Wybierz nick"
                className="bg-secondary rounded-xl p-3 w-full mt-2 border-2 border-cta focus:outline-0"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm">Email</label>
              <input
                {...register("email", {
                  required: "Email jest wymagany",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Nieprawidłowy format adresu email",
                  },
                })}
                type="email"
                placeholder="twoj@email.com"
                className="bg-secondary rounded-xl p-3 w-full mt-2 border-2 border-cta focus:outline-0"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="" className="text-sm">
                Hasło
              </label>
              <input
                {...register("password", { required: "Podaj hasło" })}
                type="password"
                placeholder="Min. 8 znaków"
                className="bg-secondary rounded-xl p-3 w-full mt-2 border-2 border-cta focus:outline-0"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="" className="text-sm">
                Powtórz hasło
              </label>
              <input
                {...register("confirmPassword", {
                  required: "Powtórz hasło",
                  validate: (value) =>
                    value === password || "Hasła muszą być identyczne",
                })}
                type="password"
                placeholder="Powtórz hasło"
                className="bg-secondary rounded-xl p-3 w-full mt-2 border-2 border-cta focus:outline-0"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="relative w-full">
              <button
                type="submit"
                className={`w-full p-3 rounded-xl font-bold cursor-pointer ${
                  loading ? "border-2 border-cta pointer-events-none" : "bg-cta"
                }`}
              >
                <span className={`${loading ? "invisible" : ""}`}>
                  Zarejestruj się
                </span>
                {loading && (
                  <div className="absolute flex items-center justify-center inset-0">
                    <div className="w-6 h-6 border-4 border-cta border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
export default LoginPopup;
