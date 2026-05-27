# frozen_string_literal: true

Jekyll::Hooks.register [:pages, :documents], :post_render do |page|
  next unless page.output_ext == ".html"
  next if page.output.include?("assets/css/site-overrides.css")

  site = page.site
  stylesheet_path = "#{site.baseurl}/assets/css/site-overrides.css".squeeze("/")
  tag = %(<link rel="stylesheet" href="#{stylesheet_path}">)

  page.output = page.output.sub("</head>", "  #{tag}\n</head>")
end
