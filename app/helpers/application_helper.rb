module ApplicationHelper
  def js_env
    data = {
        env: Rails.env
    }
    <<-EOS.html_safe
<script type="text/javascript">
  window.Rails = #{data.to_json};
</script>
    EOS
  end
end
