class ApplicationController < ActionController::Base
  include SetupCurrentTrip
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :js_env

  def push_to_js_env(hash)
    js_env_data.deep_merge!(hash)
  end

  private

  def js_env
    <<-EOS.html_safe
<script type="text/javascript">
  window.JsEnv = #{js_env_data.to_json};
</script>
    EOS
  end

  def js_env_data
    @js_env_data ||= {
        env: Rails.env
    }
  end
end
